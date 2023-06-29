import { prisma } from "@/lib/prisma";

export const getTopicsPerCategory = async (
  categoryId: string,
  page: number,
  numberOfTopics = 10
) => {
  const totalTopics = await prisma.topic.count({
    where: {
      categoryId,
    },
  });

  const totalPages = Math.ceil(totalTopics / numberOfTopics);

  const topics = await prisma.topic.findMany({
    where: {
      categoryId,
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
        topic: true,
        user: true,
      },
    });

    return {
      ...topic,
      postCount,
      latestPost,
    };
  });

  return {
    topics: await Promise.all(enrichedTopics),
    totalPages,
  };
};
