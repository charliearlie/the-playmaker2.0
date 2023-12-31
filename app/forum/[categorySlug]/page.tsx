import { Suspense } from 'react';
import { PlusIcon } from 'lucide-react';

import TopicsList from '@/components/topic/topics-list';
import { Breadcrumbs } from '@/components/breadcrumbs';
import Button from '@/components/button';

import { getCategoryFromSlug } from '@/services/category-service';
import { getTopicsPerCategory } from '@/services/topic-service';

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
          <div className="flex items-center justify-between">
            <Breadcrumbs />
            <Button
              className="flex items-center gap-1"
              variant="primary"
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
