'use client';
import { useContext, useRef } from 'react';
import { Topic } from '@prisma/client';
import Button from '@/app/components/common/button';
import { Card, CardContent, CardHeader } from '@/app/components/common/card';
import PlaymakerLink from '@/app/components/common/link';
import { Textarea } from '@/app/components/common/textarea';
import { useToast } from '@/app/components/common/toast/use-toast';
import { handlePostCreation } from '@/app/actions/post-actions';
import { UserContext } from '@/lib/contexts/user-context';
import { ToastProps } from '../common/toast/toast';

const buildToastProps = (success: boolean) => {
  const title = success ? 'Reply added successfully' : 'Something went wrong';
  const description = success
    ? 'You should now be able to see your post'
    : "You're probably not logged in";
  const variant = success ? 'success' : 'destructive';

  return { title, description, variant } as ToastProps;
};

type Props = {
  categorySlug: string;
  topic: Topic;
};

export default function CreatePost({ categorySlug, topic }: Props) {
  const user = useContext(UserContext);
  const ref = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  async function submitPost(formData: FormData) {
    if (ref.current) {
      ref.current.value = '';
    }
    const post = handlePostCreation(formData, topic, categorySlug);
    toast(buildToastProps(!!post));
  }
  return (
    <Card>
      {user?.isLoggedIn ? (
        <>
          <CardHeader>Add reply</CardHeader>
          <CardContent>
            <form action={submitPost}>
              <label className="font-semibold" htmlFor="post">
                Post text
              </label>
              <Textarea
                className="text-md h-48 bg-slate-200 font-normal"
                name="post"
                ref={ref}
              />
              <div className="flex justify-center py-2">
                <Button
                  className="min-w-[200px]"
                  variant="neutral"
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
