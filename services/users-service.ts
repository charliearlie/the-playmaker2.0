import { prisma } from '@/prisma';
import { User } from '@prisma/client';
import { getNumberOfUserPosts } from './posts-service';
import { getNumberOfUserTopics } from './topic-service';

const roles = [
  {
    id: 'user',
    label: 'User',
    colour: 'text-slate-700',
  },
  {
    id: 'mod',
    label: 'Moderator',
    colour: 'text-green-500',
  },
  {
    id: 'admin',
    label: 'Administrator',
    colour: 'text-orange-600',
  },
];

export type SafeUserData = Pick<
  User,
  'username' | 'avatarUrl' | 'email' | 'id' | 'role'
>;

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

export const getUserRoles = () => {
  return roles;
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
};

export const getUserAccountData = async (id: string) => {
  const { email, username } = await getUserById(id);

  return { email, username };
};

export type UserAccountData = Awaited<ReturnType<typeof getUserAccountData>>;

export const getUserProfileData = async (id: string) => {
  const { active, avatarUrl, createdAt, feedbackScore, role, username } =
    await getUserById(id);
  const postsCount = await getNumberOfUserPosts(id);
  const topicsCount = await getNumberOfUserTopics(id);

  return {
    active,
    avatarUrl,
    createdAt,
    feedbackScore,
    role,
    username,
    postsCount,
    topicsCount,
  };
};

export type UserProfileData = Awaited<ReturnType<typeof getUserProfileData>>;
