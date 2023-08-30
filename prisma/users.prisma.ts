import { prisma } from '@/prisma';

export const getTotalNumberOfUsers = async () => {
  return await prisma.user.count();
};

export const getMostRecentUser = async () => {
  const mostRecentUser = await prisma.user.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return mostRecentUser;
};
