import { redirect } from 'next/navigation';

import Button from '@/components/button';
import AdvancedInput from '@/components/input/advanced-input';
import { Textarea } from '@/components/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardSubheader,
} from '@/components/card';

import { getCategoryFromSlug } from '@/services/category-service';
import { createTopicAndInitialpost } from '@/services/topic-service';

import { useServerUser } from '@/lib/user-auth';

type Props = {
  params: { categorySlug: string };
};

export default async function ForumPage({ params }: Props) {
  const user = await useServerUser();
  const { categorySlug } = params;
  const createTopic = async (formData: FormData) => {
    'use server';
    const title = formData.get('title') || '';
    const post = formData.get('post') || '';

    if (!user.id || typeof title !== 'string' || typeof post !== 'string') {
      return null;
    }

    const redirectPath = await createTopicAndInitialpost({
      categorySlug: categorySlug,
      topicTitle: title,
      postText: post,
      userId: user.id,
    });

    if (redirectPath) {
      redirect(redirectPath);
    }
  };

  const category = await getCategoryFromSlug(categorySlug);
  // todo: Redirect if category doesn't exist
  if (category) {
    return (
      <Card fillParent>
        <CardHeader>Post a new thread</CardHeader>
        <CardSubheader>Message information</CardSubheader>
        <CardContent>
          <form>
            <label className="font-semibold" htmlFor="title">
              Topic title
            </label>
            <AdvancedInput
              className="bg-slate-200 text-lg font-semibold"
              charLimit={50}
              name="title"
              type="text"
            />
            <label className="font-semibold" htmlFor="post">
              Post text
            </label>
            <Textarea
              className="text-md h-48 bg-slate-200 font-normal"
              name="post"
            />
            <div className="flex justify-end gap-2 py-2">
              <Button
                className="w-32"
                variant="neutral"
                formAction={createTopic}
                type="submit"
              >
                Draft
              </Button>
              <Button
                className="w-32"
                variant="primary"
                formAction={createTopic}
                type="submit"
              >
                Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}
