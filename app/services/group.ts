import { prisma } from "@/lib/prisma";

export const getGroupData = async () => {
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

  const enrichedGroupsWithCategories = groupsWithCategories.map((group) => ({
    ...group,
    categories: group.categories.map(async (category) => {
      const latestPost = await prisma.post.findFirst({
        where: {
          topic: {
            categoryId: category.id,
          },
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
        ...category,
        latestPost,
        topicCount: category.topics.length,
        postCount: category.topics.reduce(
          (total, topic) => total + topic.posts.length,
          0
        ),
      };
    }),
  }));

  // Because we're using async functions in the map function above, we have to resolve the promises
  const resolvedGroups = await Promise.all(
    enrichedGroupsWithCategories.map(async (group) => ({
      ...group,
      categories: await Promise.all(group.categories),
    }))
  );

  return resolvedGroups;
};
