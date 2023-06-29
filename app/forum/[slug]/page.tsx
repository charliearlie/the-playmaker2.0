import { Suspense } from "react";
import { getCategoryFromSlug } from "@/services/category-service";
import TopicsList from "@/app/components/topic/topics-list";

type Props = {
  params: { slug: string };
  searchParams: { page: string };
};

export default async function ForumPage({ params, searchParams }: Props) {
  const categorySlug = params.slug;
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const category = await getCategoryFromSlug(categorySlug);

  if (category) {
    return (
      <Suspense fallback={<h3>Loading...</h3>}>
        <div className="w-full">
          {JSON.stringify(searchParams)}
          <TopicsList category={category} page={page} />
        </div>
      </Suspense>
    );
  }
}
