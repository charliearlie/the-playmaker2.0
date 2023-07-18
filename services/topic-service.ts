import supabase from "@/lib/supabase";
import { Database } from "@/supabase/database";

// function to get total topics per category
const getTotalTopicsPerCategory = async (categoryId: string) => {
  const { data: totalTopics, error } = await supabase
    .from("Topic")
    .select("*", { count: "exact" })
    .eq("category_id", categoryId);

  if (error) {
    console.error(error);
  }

  return totalTopics?.length || 0;
};

// function to get topics by category with pagination
const getTopicsByCategory = async (
  categoryId: string,
  page: number,
  numberOfTopics = 10
) => {
  const { data: topics, error } = await supabase
    .from("Topic")
    .select("*")
    .eq("category_id", categoryId)
    .order("createdAt", { ascending: false })
    .range((page - 1) * numberOfTopics || 0, page * numberOfTopics - 1);

  if (error) {
    console.error(error);
    return [];
  }

  // Make a separate request for each user associated with each topic
  const topicsWithUser = await Promise.all(
    topics.map(async (topic) => {
      const { data: user, error: userError } = await supabase
        .from("User")
        .select("*")
        .eq("id", topic.user_id)
        .single();

      if (userError) {
        console.error(userError);
      }

      return { ...topic, user };
    })
  );

  return topicsWithUser || [];
};

// function to get post count per topic
const getPostCountPerTopic = async (topicId: string) => {
  const { data: posts, error } = await supabase
    .from("Post")
    .select("*", { count: "exact" })
    .eq("topic_id", topicId);

  if (error) {
    console.error(error);
  }

  return posts?.length || 0;
};

interface LatestPost extends Database["public"]["Tables"]["Post"]["Row"] {
  User: Database["public"]["Tables"]["User"]["Row"];
}

const getLatestPostPerTopic = async (topicId: string) => {
  const { data: latestPost, error } = await supabase
    .from("Post")
    .select(
      `
        *,
        Topic (*)
      `
    )
    .eq("topic_id", topicId)
    .order("createdAt", { ascending: false })
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  // assuming there's a user_id field in the Post table
  const { data: user, error: userError } = await supabase
    .from("User")
    .select("*")
    .eq("id", latestPost.user_id)
    .single();

  if (userError) {
    console.error(userError);
    return null;
  }

  // merge the post data with the fetched user data
  return { ...latestPost, user };
};

export const getTopicsPerCategory = async (
  categoryId: string,
  page: number,
  numberOfTopics = 10
) => {
  const totalTopics = await getTotalTopicsPerCategory(categoryId);
  const totalPages = Math.ceil(totalTopics / numberOfTopics);
  const topics = await getTopicsByCategory(categoryId, page, numberOfTopics);

  const enrichedTopics = await Promise.all(
    topics.map(async (topic) => {
      console.log("FUCKING HELL FIGURE THIS OUT", topic);
      const { User, ...topicRest } = topic;
      const postCount = await getPostCountPerTopic(topic.id);
      const latestPost = await getLatestPostPerTopic(topic.id);

      console.log("RETURNY WURNY", {
        ...topicRest,
        user: User,
        postCount,
        latestPost,
      });
      return {
        ...topicRest,
        user: User,
        postCount,
        latestPost,
      };
    })
  );

  return {
    topics: enrichedTopics,
    totalPages,
  };
};
