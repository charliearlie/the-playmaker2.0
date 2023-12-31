import { prisma } from '@/prisma';
import { Post, Role, Topic, User } from '@prisma/client';
import { generateSlug } from '@/lib/utils';

import { SafeUserData } from './users-service';

export type EnrichedTopic = Topic & {
  postCount: number;
  user: SafeUserData;
  latestPost:
    | (Post & {
        user: User;
      })
    | null;
};

type TopicMergedWithUser = Topic & {
  username: string;
  userId: string;
  userRole: Role;
  userAvatarUrl: string;
  userEmail: string;
};

type TopicWithUser = Topic & {
  user: SafeUserData;
};

const enrichTopics = async (
  topics: TopicWithUser[],
): Promise<EnrichedTopic[]> => {
  const enrichedTopics = topics.map(async (topic) => {
    const postCount = await prisma.post.count({
      where: {
        topicId: topic.id,
      },
    });

    const latestPost = await prisma.post.findFirst({
      where: {
        topicId: topic.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });

    return {
      ...topic,
      postCount,
      latestPost,
    };
  });

  return await Promise.all(enrichedTopics);
};

export const getTopicsPerCategory = async (
  categorySlug: string,
  page: number,
  numberOfTopics = 10,
) => {
  const totalTopics = await prisma.topic.count({
    where: {
      categorySlug,
    },
  });

  const totalPages = Math.ceil(totalTopics / numberOfTopics);

  const topics = await prisma.topic.findMany({
    where: {
      categorySlug,
    },
    include: {
      user: {
        select: {
          avatarUrl: true,
          email: true,
          id: true,
          username: true,
          role: true,
        },
      },
    },
    take: numberOfTopics,
    skip: (page - 1) * numberOfTopics || 0,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    topics: await enrichTopics(topics),
    totalPages,
  };
};

export const searchTopics = async (searchTerm: string) => {
  const sanitisedSearchTerm = `%${searchTerm}%`; // Use percentage signs for LIKE query

  const rawTopics: TopicMergedWithUser[] = await prisma.$queryRaw`
  SELECT "Topic".*, 
         "User"."id" AS "userId",
         "User"."username",
         "User"."role" AS "userRole",
         "User"."avatarUrl" AS "userAvatarUrl",
         "User"."email" AS "userEmail"
         /* Add any other User fields here with aliases if they overlap with Topic fields */
  FROM "Topic"
  JOIN "User" ON "Topic"."userId" = "User"."id"
  WHERE unaccent("Topic"."title") ILIKE unaccent(${sanitisedSearchTerm})
`;

  const topics = rawTopics.map(
    ({
      categorySlug,
      createdAt,
      id,
      slug,
      title,
      updatedAt,
      userAvatarUrl,
      userEmail,
      userRole,
      username,
      userId,
      views,
    }) => {
      return {
        categorySlug,
        createdAt,
        id,
        slug,
        title,
        updatedAt,
        userId,
        views,
        user: {
          username,
          id: userId,
          avatarUrl: userAvatarUrl,
          role: userRole,
          email: userEmail,
        },
      };
    },
  );

  const enrichedTopics = await enrichTopics(topics);

  return {
    topics: enrichedTopics,
    totalPages: 1,
  };
};

type CreateTopicAndPostOptions = {
  categorySlug: string;
  postText: string;
  topicTitle: string;
  userId: string;
};
export const createTopicAndInitialpost = async ({
  categorySlug,
  postText,
  topicTitle,
  userId,
}: CreateTopicAndPostOptions) => {
  const category = await prisma.category.findUnique({
    where: {
      slug: categorySlug,
    },
  });
  if (category) {
    const newTopic = await prisma.topic.create({
      data: {
        category: {
          connect: {
            slug: categorySlug,
          },
        },
        title: topicTitle,
        slug: generateSlug(topicTitle),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (newTopic) {
      const originalPost = await prisma.post.create({
        data: {
          topicId: newTopic.id,
          content: postText,
          userId: newTopic.userId,
          originalPost: true,
        },
      });
      return `/forum/${newTopic.categorySlug}/${newTopic.slug}`;
    }
  }
};

export const getTopicFromSlug = async (slug: string) => {
  const topic = await prisma.topic.findUnique({
    where: {
      slug,
    },
  });

  if (topic) {
    await addViewToTopic(topic);
  }

  return topic;
};

export const addViewToTopic = async (topic: Topic) => {
  await prisma.topic.update({
    data: {
      views: topic.views + 1,
    },
    where: {
      id: topic.id,
    },
  });
};

export const getNumberOfUserTopics = async (userId: string) => {
  return await prisma.topic.count({ where: { userId } });
};
