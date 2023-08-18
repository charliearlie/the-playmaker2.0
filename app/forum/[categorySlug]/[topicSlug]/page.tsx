import { Suspense } from "react";
import { getTopicFromSlug } from "@/services/topic-service";
import { createPost, getTopicPosts } from "@/services/posts-service";
import Posts from "@/app/components/posts/posts";
import { Card, CardContent, CardHeader } from "@/app/components/common/card";
import { Textarea } from "@/app/components/common/textarea";
import Button from "@/app/components/common/button";
import useUser from "@/lib/useUser";
import { redirect, usePathname } from "next/navigation";

type Props = {
  params: { categorySlug: string; topicSlug: string };
  searchParams: { page: string };
};

export default async function TopicPage({ params, searchParams }: Props) {
  const { id: userId, isLoggedIn } = await useUser();
  const { categorySlug, topicSlug } = params;
  const topic = await getTopicFromSlug(topicSlug);
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const addPost = async (formData: FormData) => {
    "use server";
    const post = formData.get("post") || "";

    if (!userId || typeof post !== "string" || !topic) {
      // todo: handle error elegantly
      return null;
    }

    const newPost = await createPost({
      postText: post,
      topicId: topic.id,
      userId: userId,
    });

    if (newPost) {
      redirect(`forum/${categorySlug}/${topic.slug}#${newPost.id}`);
    }
  };

  if (topic) {
    const posts = await getTopicPosts(topic?.id);
    return (
      <Suspense fallback={<h3>Loading...</h3>}>
        <div className="w-full">
          <Posts posts={posts} topicTitle={topic.title} />
          {/* TODO: turn this into a component */}
          {isLoggedIn ? (
            <Card>
              <CardHeader>Add reply</CardHeader>
              <CardContent>
                <form>
                  <label className="font-semibold" htmlFor="post">
                    Post text
                  </label>
                  <Textarea
                    className="bg-slate-200 font-normal text-md h-48"
                    name="post"
                  />
                  <Button formAction={addPost} type="submit">
                    Add reply
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </Suspense>
    );
  }
}
