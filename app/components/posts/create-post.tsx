import useUser from '@/lib/useUser';
import { Card, CardContent, CardHeader } from '../common/card';
import { Textarea } from '../common/textarea';
import Button from '../common/button';
import PlaymakerLink from '../common/link';
import { Topic } from '@prisma/client';
import { createPost } from '@/services/posts-service';
import { redirect } from 'next/navigation';

type Props = {
  categorySlug: string;
  topic: Topic;
};

export default async function CreatePost({ categorySlug, topic }: Props) {
  const { id: userId, isLoggedIn } = await useUser();
  const addPost = async (formData: FormData) => {
    'use server';
    const post = formData.get('post') || '';

    if (!userId || typeof post !== 'string' || !topic) {
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

  return (
    <Card>
      {isLoggedIn ? (
        <>
          <CardHeader>Add reply</CardHeader>
          <CardContent>
            <form>
              <label className="font-semibold" htmlFor="post">
                Post text
              </label>
              <Textarea
                className="text-md h-48 bg-slate-200 font-normal"
                name="post"
              />
              <div className="flex justify-center py-1">
                <Button
                  className="min-w-[120px]"
                  formAction={addPost}
                  type="submit"
                >
                  Add reply
                </Button>
              </div>
            </form>
          </CardContent>
        </>
      ) : (
        <CardContent className="flex justify-center items-center h-24 font-semibold text-lg">
          <PlaymakerLink href="/login">
            Sign in to reply to this thread
          </PlaymakerLink>
        </CardContent>
      )}
    </Card>
  );
}
