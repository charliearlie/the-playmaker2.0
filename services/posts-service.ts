import { prisma } from "@/prisma";

export const getTotalNumberOfPosts = async () => {
  return await prisma.post.count();
};

export const getTopicPosts = async (topicId: string) => {
  return (
    (await prisma.post.findMany({
      where: {
        topicId,
      },
    })) || []
  );
};
