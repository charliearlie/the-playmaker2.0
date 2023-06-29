import { prisma } from "@/lib/prisma";

const roles = [
  {
    id: "user",
    label: "User",
    colour: "text-slate-700",
  },
  {
    id: "mod",
    label: "Moderator",
    colour: "text-green-500",
  },
  {
    id: "admin",
    label: "Administrator",
    colour: "text-orange-600",
  },
];

export const getTotalNumberOfUsers = async () => {
  return await prisma.user.count();
};

export const getMostRecentUser = async () => {
  const mostRecentUser = await prisma.user.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  return mostRecentUser;
};

export const getUserRoles = () => {
  return roles;
};