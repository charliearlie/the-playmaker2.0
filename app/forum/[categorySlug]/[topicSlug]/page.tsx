import { Suspense } from "react";
import { getCategoryFromSlug } from "@/services/category-service";
import TopicsList from "@/app/components/topic/topics-list";
import {
  getTopicFromSlug,
  getTopicsPerCategory,
} from "@/services/topic-service";
import { Breadcrumbs } from "@/app/components/breadcrumbs";
import Button from "@/app/components/common/button";
import { PlusIcon } from "lucide-react";
import { getTopicPosts } from "@/services/posts-service";

type Props = {
  params: { topicSlug: string };
  searchParams: { page: string };
};

export default async function ForumPage({ params, searchParams }: Props) {
  const { topicSlug } = params;
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const topic = await getTopicFromSlug(topicSlug);
  if (topic) {
    const posts = await getTopicPosts(topic?.id);
    return (
      <Suspense fallback={<h3>Loading...</h3>}>
        <div className="w-full">
          <ul>
            {posts.map((post) => (
              <div key={post.id}>{post.content}</div>
            ))}
          </ul>
        </div>
      </Suspense>
    );
  }
}
