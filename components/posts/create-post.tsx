'use client';
import { useRef } from 'react';
import { Topic } from '@prisma/client';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { usePathname } from 'next/navigation';

import Button from '@/components/button';
import { Card, CardContent, CardHeader } from '@/components/card';
import { Textarea } from '@/components/textarea';
import { useToast } from '@/components/toast/use-toast';
import { ToastProps } from '@/components/toast/toast';
import { handlePostCreation } from '@/app/actions/post-actions';
import { useClientUser } from '@/lib/contexts/user-context';
import { LoginLink, LoginLinkText } from '@/components/link';

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
  const { user } = useClientUser();
  const { toast } = useToast();
  const pathname = usePathname();
  const { pending } = useFormStatus();
  const ref = useRef<HTMLTextAreaElement>(null);

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
          <CardHeader id="add-reply">Add reply</CardHeader>
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
                  disabled={pending}
                  variant="neutral"
                  type="submit"
                >
                  {pending ? 'Posting reply' : 'Add reply'}
                </Button>
              </div>
            </form>
          </CardContent>
        </>
      ) : (
        <CardContent className="flex justify-center items-center h-24 font-semibold text-lg">
          <LoginLink callback={pathname}>
            <LoginLinkText>Sign in to reply to this thread</LoginLinkText>
          </LoginLink>
        </CardContent>
      )}
    </Card>
  );
}
