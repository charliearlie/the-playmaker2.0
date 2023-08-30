import { prisma } from '@/prisma';

export const getCategoryFromSlug = async (categorySlug: string) => {
  return await prisma.category.findUnique({ where: { slug: categorySlug } });
};
