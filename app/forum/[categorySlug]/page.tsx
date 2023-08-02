import { Suspense } from "react";
import { getCategoryFromSlug } from "@/services/category-service";
import TopicsList from "@/app/components/topic/topics-list";
import { getTopicsPerCategory } from "@/services/topic-service";
import { Breadcrumbs } from "@/app/components/breadcrumbs";
import Button from "@/app/components/common/button";
import { PlusIcon } from "lucide-react";

type Props = {
  params: { categorySlug: string };
  searchParams: { page: string };
};

export default async function ForumPage({ params, searchParams }: Props) {
  const { categorySlug } = params;
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const category = await getCategoryFromSlug(categorySlug);
  // todo: Redirect if category doesn't exist
  const { topics, totalPages } = await getTopicsPerCategory(categorySlug, page);
  if (category) {
    return (
      <Suspense fallback={<h3>Loading...</h3>}>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <Breadcrumbs />
            <Button
              className="flex gap-1 items-center"
              variant="primary"
              asLink
              href={`/create-thread/${categorySlug}`}
            >
              Create thread <PlusIcon />
            </Button>
          </div>
          <TopicsList category={category} page={page} topics={topics} />
        </div>
      </Suspense>
    );
  }
}
