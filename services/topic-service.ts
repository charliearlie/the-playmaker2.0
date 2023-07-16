import supabase from "@/lib/supabase";

export const getTopicsPerCategory = async (
  categoryId: string,
  page: number,
  numberOfTopics = 10
) => {
  const { data: totalTopics, error: countError } = await supabase
    .from("Topic")
    .select("*", { count: "exact" })
    .eq("category_id", categoryId);
  if (countError) {
    console.error(countError);
  }

  const totalPages = Math.ceil((totalTopics?.length || 0) / numberOfTopics);

  const { data: topics, error: topicsError } = await supabase
    .from("Topic")
    .select(
      `
      *,
      User (*)
    `
    )
    .eq("category_id", categoryId)
    .order("createdAt", { ascending: false })
    .range((page - 1) * numberOfTopics || 0, page * numberOfTopics - 1);
  if (topicsError) {
    console.error(topicsError);
  }

  const enrichedTopics = await Promise.all(
    (topics || []).map(async (topic) => {
      const { User, ...topicRest } = topic;
      const { data: postCount, error: countError } = await supabase
        .from("Post")
        .select("*", { count: "exact" })
        .eq("topic_id", topic.id);
      if (countError) {
        console.error(countError);
      }

      const { data: latestPost, error: postError } = await supabase
        .from("Post")
        .select(
          `
          *,
          Topic (*),
          User (*)
        `
        )
        .eq("topic_id", topic.id)
        .order("createdAt", { ascending: false })
        .single();
      if (postError) {
        console.error(postError);
      }

      const { User: user, ...postRest } = latestPost!;
      return {
        ...topicRest,
        user, // rename 'User' to 'user'
        postCount: postCount?.length || 0,
        latestPost: {
          ...postRest,
          user,
        },
      };
    })
  );

  return {
    topics: enrichedTopics,
    totalPages,
  };
};
