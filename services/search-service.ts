import { prisma } from "@/lib/prisma";

export const searchPosts = async (searchTerm: string) => {
  return await prisma.topic.findMany({
    where: {
      title: {
        search: searchTerm,
      },
    },
  });
};
