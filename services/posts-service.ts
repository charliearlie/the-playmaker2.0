import { prisma } from "@/prisma";

export const getTotalNumberOfPosts = async () => {
  return await prisma.post.count();
};
