import { prisma } from "./prisma";

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
