import { prisma } from "@/lib/prisma";

export const getTotalNumberOfPosts = async () => {
  return await prisma.post.count();
};
