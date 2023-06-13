import { prisma } from "@/lib/prisma";

export const getGroupData = async () => {
  const categories = await prisma.category.findMany();
  const groupsWithCategories = await prisma.group.findMany({
    include: {
      categories: {
        include: {
          topics: {
            include: {
              posts: true,
            },
          },
        },
      },
    },
  });

  const groupsWithCounts = groupsWithCategories.map((group) => ({
    ...group,
    categories: group.categories.map((category) => ({
      ...category,
      topicCount: category.topics.length,
      postCount: category.topics.reduce(
        (total, topic) => total + topic.posts.length,
        0
      ),
    })),
  }));

  return groupsWithCounts;
};

type GetGroupsOptions = {
  includeCategories?: boolean;
};

export const getGroups = async (options?: GetGroupsOptions) => {
  return await prisma.group.findMany({
    include: {
      categories: options?.includeCategories || false,
    },
  });
};
