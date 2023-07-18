import { getCategoryFromSlug } from "./category-service";

export type Category = NonNullable<
  Awaited<ReturnType<typeof getCategoryFromSlug>>
>;
