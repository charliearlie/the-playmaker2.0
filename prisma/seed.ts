import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function main() {
  const password = "password";
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create two users
  const user1 = await prisma.user.create({
    data: {
      username: "User1",
      email: "user1@example.com",
      password: hashedPassword,
      role: "USER",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "User2",
      email: "user2@example.com",
      password: hashedPassword,
      role: "USER",
    },
  });

  const group1 = await prisma.group.create({
    data: {
      name: "Group 1",
    },
  });

  const group2 = await prisma.group.create({
    data: {
      name: "Group 2",
    },
  });

  // Create two categories for each group
  const category1 = await prisma.category.create({
    data: {
      name: "Category 1",
      description: "This is category 1",
      groupId: group1.id,
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Category 2",
      description: "This is category 2",
      groupId: group1.id,
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: "Category 3",
      description: "This is category 3",
      groupId: group2.id,
    },
  });

  const category4 = await prisma.category.create({
    data: {
      name: "Category 4",
      description: "This is category 4",
      groupId: group2.id,
    },
  });

  // Create one topic for each category
  const topic1 = await prisma.topic.create({
    data: {
      title: "Topic 1",
      slug: generateSlug("Topic 1"),
      userId: user1.id,
      categoryId: category1.id,
      votes: 0,
    },
  });

  const topic2 = await prisma.topic.create({
    data: {
      title: "Topic 2",
      slug: generateSlug("Topic 2"),
      userId: user1.id,
      categoryId: category2.id,
      votes: 0,
    },
  });

  const topic3 = await prisma.topic.create({
    data: {
      title: "Topic 3",
      slug: generateSlug("Topic 3"),
      userId: user2.id,
      categoryId: category3.id,
      votes: 0,
    },
  });

  const topic4 = await prisma.topic.create({
    data: {
      title: "Topic 4",
      slug: generateSlug("Topic 4"),
      userId: user2.id,
      categoryId: category4.id,
      votes: 0,
    },
  });

  // Create posts for each topic
  await prisma.post.create({
    data: {
      content: "This is the first post for Topic 1",
      userId: user1.id,
      topicId: topic1.id,
    },
  });

  await prisma.post.create({
    data: {
      content: "This is the first post for Topic 2",
      userId: user1.id,
      topicId: topic2.id,
    },
  });

  await prisma.post.create({
    data: {
      content: "This is the first post for Topic 3",
      userId: user2.id,
      topicId: topic3.id,
    },
  });

  await prisma.post.create({
    data: {
      content: "This is the first post for Topic 4",
      userId: user2.id,
      topicId: topic4.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
