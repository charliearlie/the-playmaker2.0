import supabase from "@/lib/supabase";
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  groupId: string;
}

export const getCategoryFromSlug = async (categorySlug: string) => {
  const { data: Category, error } = await supabase
    .from("Category")
    .select("*")
    .eq("slug", categorySlug)
    .single();

  return Category;
};
