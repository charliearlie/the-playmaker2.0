import { Suspense } from 'react';
import { getTopicFromSlug } from '@/services/topic-service';
import { getTopicPosts } from '@/services/posts-service';
import Posts from '@/app/components/posts/posts';
import CreatePost from '@/app/components/posts/create-post';

type Props = {
  params: { categorySlug: string; topicSlug: string };
  searchParams: { page: string };
};

export default async function TopicPage({ params, searchParams }: Props) {
  const { categorySlug, topicSlug } = params;
  const topic = await getTopicFromSlug(topicSlug);
  const page = searchParams.page ? Number(searchParams.page) : 1;

  if (topic) {
    const posts = await getTopicPosts(topic?.id);
    return (
      <Suspense fallback={<h3>Loading...</h3>}>
        <div className="w-full">
          <Posts posts={posts} topicTitle={topic.title} />
          <CreatePost categorySlug={categorySlug} topic={topic} />
        </div>
      </Suspense>
    );
  }
}
