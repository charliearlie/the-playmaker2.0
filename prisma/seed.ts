import { prisma } from ".";
import bcrypt from "bcrypt";

export function generateSlug(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") + `-${Math.floor(Math.random() * 9000 + 1000)}`
  );
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
      slug: generateSlug("Category 1"),
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Category 2",
      description: "This is category 2",
      groupId: group1.id,
      slug: generateSlug("Category 2"),
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: "Category 3",
      description: "This is category 3",
      groupId: group2.id,
      slug: generateSlug("Category 3"),
    },
  });

  const category4 = await prisma.category.create({
    data: {
      name: "Category 4",
      description: "This is category 4",
      groupId: group2.id,
      slug: generateSlug("Category 4"),
    },
  });

  // Create one topic for each category
  const topic1 = await prisma.topic.create({
    data: {
      title:
        "Arsenal still trying to sign Mr. Pilau, despite him retiring 4 years ago",
      slug: "arsenal-sign-mr-pilau",
      userId: user1.id,
      categorySlug: category1.slug,
      views: 9100,
    },
  });

  const topic2 = await prisma.topic.create({
    data: {
      title: "PIF buy Gervinho and loan him to Newcastle",
      slug: "gervinho-loan-newcastle",
      userId: user1.id,
      categorySlug: category1.slug,
      views: 210,
    },
  });

  const topic3 = await prisma.topic.create({
    data: {
      title: "Arctic Monkeys tribute act headline Glastonbury",
      slug: "arctic-monkeys-tribute",
      userId: user2.id,
      categorySlug: category2.slug,
      views: 5410,
    },
  });

  const topic4 = await prisma.topic.create({
    data: {
      title: "Arsenal might have hurts themselves with new signing",
      slug: "arsenal-sign-havertz",
      userId: user2.id,
      categorySlug: category1.slug,
      views: 6503,
    },
  });

  const topic5 = await prisma.topic.create({
    data: {
      title: "Busquets has follwed Messi's crumbs to Inter Miami",
      slug: "busquets-biscuits",
      userId: user2.id,
      categorySlug: category1.slug,
      views: 1200,
    },
  });

  const topic6 = await prisma.topic.create({
    data: {
      title: "Arsenal are not going dowm, they're yelling Timber",
      slug: "arsenal-interedt-in-jurrien-timber",
      userId: user1.id,
      categorySlug: category1.slug,
      views: 4000,
    },
  });
  const topic7 = await prisma.topic.create({
    data: {
      title: "Manchester United withdraw contract offer made to De Gea",
      slug: "de-gea-contract-withdrawn",
      userId: user2.id,
      categorySlug: category1.slug,
      views: 616,
    },
  });
  const topic8 = await prisma.topic.create({
    data: {
      title: "Liverpool fans delusionly think they are in for Mbappe",
      slug: "liverpool-mbappe-links",
      userId: user2.id,
      categorySlug: category1.slug,
      views: 3245,
    },
  });
  const topic9 = await prisma.topic.create({
    data: {
      title: "Sandro Tonali agrees terms with Newcastle United",
      slug: "tonali-saudi-corruption",
      userId: user1.id,
      categorySlug: category1.slug,
      views: 400,
    },
  });
  const topic10 = await prisma.topic.create({
    data: {
      title: "Robbie Keane, new manager of boyhood club Maccabi Tel Aviv",
      slug: "keane-tel-aviv",
      userId: user2.id,
      categorySlug: category1.slug,
      views: 1200,
    },
  });
  const topic11 = await prisma.topic.create({
    data: {
      title: "Mesut Özil wins Fortnite tournament",
      slug: "ozil-fortnite",
      userId: user1.id,
      categorySlug: category1.slug,
      views: 111,
    },
  });
  const topic12 = await prisma.topic.create({
    data: {
      title: "Eni Aluko thinks Pep bid for Mr. Pilau to help Arsenal",
      slug: "aluko-stupido",
      userId: user1.id,
      categorySlug: category1.slug,
      views: 3322,
    },
  });
  const topic13 = await prisma.topic.create({
    data: {
      title:
        "Lionel Messi in Oscars discussions after immaculate acting performance",
      slug: "messi-oscars",
      userId: user2.id,
      categorySlug: category1.slug,
      views: 854,
    },
  });
  const topic14 = await prisma.topic.create({
    data: {
      title: "Kovacic moves from mid table team to title winners",
      slug: "kovacic-signs-for-city",
      userId: user1.id,
      categorySlug: category1.slug,
      views: 2300,
    },
  });
  const topic15 = await prisma.topic.create({
    data: {
      title:
        "Bayern bid £60m for Harry Kane, hoping Spurs would think the bid is for Richarlison",
      slug: "kane-bayern",
      userId: user1.id,
      categorySlug: category1.slug,
      views: 2495,
    },
  });
  const topic16 = await prisma.topic.create({
    data: {
      title: "Ruben Loftus-Cheek signs for Milan",
      slug: "rlc-milan",
      userId: user2.id,
      categorySlug: category1.slug,
      views: 1200,
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

  await prisma.post.create({
    data: {
      content: "This is the first post for Topic 5",
      userId: user1.id,
      topicId: topic5.id,
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
