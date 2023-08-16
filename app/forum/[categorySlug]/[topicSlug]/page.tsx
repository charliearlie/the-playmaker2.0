import { Suspense } from "react";
import { getTopicFromSlug } from "@/services/topic-service";
import { getTopicPosts } from "@/services/posts-service";
import Posts from "@/app/components/posts/posts";

type Props = {
  params: { topicSlug: string };
  searchParams: { page: string };
};

export default async function TopicPage({ params, searchParams }: Props) {
  const { topicSlug } = params;
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const topic = await getTopicFromSlug(topicSlug);
  if (topic) {
    const posts = await getTopicPosts(topic?.id);
    return (
      <Suspense fallback={<h3>Loading...</h3>}>
        <div className="w-full">
          <Posts posts={posts} topicTitle={topic.title} />
        </div>
      </Suspense>
    );
  }
}
