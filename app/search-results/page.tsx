import { searchTopics } from '@/services/topic-service';
import { Suspense } from 'react';
import TopicsList from '../components/topic/topics-list';
import { Breadcrumbs } from '../components/breadcrumbs';

type Props = {
  searchParams: { searchTerm: string };
};

export default async function SearchResultsPage({ searchParams }: Props) {
  const { searchTerm } = searchParams;
  const { topics, totalPages } = await searchTopics(searchTerm);

  if (topics) {
    return (
      <Suspense fallback={<h3>Loading...</h3>}>
        <div className="w-full">
          <Breadcrumbs optionalCrumb={searchTerm} />
          <TopicsList topics={topics} />
        </div>
      </Suspense>
    );
  }
}
