import { prisma } from "@/lib/prisma";
import { Post, Topic, User } from "@prisma/client";

export type EnrichedTopic = Topic & {
  postCount: number;
  user: User;
  latestPost:
    | (Post & {
        user: User;
      })
    | null;
};

type TopicWithUser = Topic & {
  user: User;
};

const enrichTopics = async (
  topics: TopicWithUser[]
): Promise<EnrichedTopic[]> => {
  const enrichedTopics = topics.map(async (topic) => {
    const postCount = await prisma.post.count({
      where: {
        topicId: topic.id,
      },
    });

    const latestPost = await prisma.post.findFirst({
      where: {
        topicId: topic.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    return {
      ...topic,
      postCount,
      latestPost,
    };
  });

  return await Promise.all(enrichedTopics);
};

export const getTopicsPerCategory = async (
  categorySlug: string,
  page: number,
  numberOfTopics = 10
) => {
  const totalTopics = await prisma.topic.count({
    where: {
      categorySlug,
    },
  });

  const totalPages = Math.ceil(totalTopics / numberOfTopics);

  const topics = await prisma.topic.findMany({
    where: {
      categorySlug,
    },
    include: {
      user: true,
    },
    take: numberOfTopics,
    skip: (page - 1) * numberOfTopics || 0,
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    topics: await enrichTopics(topics),
    totalPages,
  };
};

export const searchTopics = async (searchTerm: string) => {
  const sanitisedSearchTerm = searchTerm.split(" ").join(" & ");
  const topics = await prisma.topic.findMany({
    where: {
      title: {
        search: sanitisedSearchTerm,
      },
    },
    include: {
      user: true,
    },
  });

  const enrichedTopics = await enrichTopics(topics);

  return {
    topics: enrichedTopics,
    totalPages: 1,
  };
};
