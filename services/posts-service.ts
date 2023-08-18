import { prisma } from "@/prisma";
import { Topic } from "@prisma/client";
import { redirect } from "next/navigation";

export const getTotalNumberOfPosts = async () => {
  return await prisma.post.count();
};

export const getTopicPosts = async (topicId: string) => {
  return (
    (await prisma.post.findMany({
      where: {
        topicId,
      },
      include: {
        user: true,
      },
    })) || []
  );
};

export type CreatePostOptions = {
  postText: string;
  topicId: string;
  userId: string;
};
export const createPost = async ({
  postText,
  topicId,
  userId,
}: CreatePostOptions) => {
  const post = await prisma.post.create({
    data: {
      content: postText,
      topic: {
        connect: {
          id: topicId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return post;
};
