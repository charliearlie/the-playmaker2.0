import { prisma } from '@/prisma';

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

export const removePost = async (id: string) => {
  const deletedPost = await prisma.post.delete({ where: { id } });

  return deletedPost ? true : false;
};

export const getPost = async (id: string) =>
  await prisma.post.findUnique({ where: { id } });
