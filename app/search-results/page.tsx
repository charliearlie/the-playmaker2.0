import { searchTopics } from "@/services/topic-service";
import { Suspense } from "react";
import TopicsList from "../components/topic/topics-list";

type Props = {
  searchParams: { searchTerm: string };
};

export default async function SearchResultsPage({ searchParams }: Props) {
  const { topics, totalPages } = await searchTopics(searchParams.searchTerm);

  if (topics) {
    return (
      <Suspense fallback={<h3>Loading...</h3>}>
        <div className="w-full">
          {JSON.stringify(searchParams)}
          <TopicsList topics={topics} />
        </div>
      </Suspense>
    );
  }
}
