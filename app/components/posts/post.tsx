'use client';
import { Post, User } from '@prisma/client';
import { DeleteIcon, TextQuote } from 'lucide-react';

import { formatDateToUsersPreference, getYear } from '@/lib/dates';
import { useToast } from '@/app/components/common/toast/use-toast';

import Button from '../common/button';
import { CardFooter, CardSubheader } from '../common/card';

import RoleBadge from '../user/role-badge';
import PostMarkdown from './post-markdown';
import { handleDelete } from '@/app/actions/post-actions';
import { ToastProps } from '../common/toast/toast';
import DeletePostDialog from './delete-post-dialog';
import { useRouter } from 'next/navigation';

type Props = {
  post: Post & {
    user: User;
  };
};

const buildToastProps = (success: boolean) => {
  const title = success ? 'Post deleted successfully' : 'Something went wrong';
  const description = success
    ? 'Our code works'
    : "You're probably not logged in";
  const variant = success ? 'success' : 'destructive';

  return { title, description, variant, duration: 5000 } as ToastProps;
};

export default function Post({ post }: Props) {
  const { toast } = useToast();
  const router = useRouter();

  async function deleteButtonClick() {
    const postDeletedSuccessfully = await handleDelete(post);
    const { dismiss } = toast(buildToastProps(postDeletedSuccessfully));
    setTimeout(() => {
      dismiss();
    }, 5000);
    router.refresh();
  }

  return (
    <div id={post.id}>
      <CardSubheader>
        {formatDateToUsersPreference(post.createdAt)}
      </CardSubheader>
      <div className="min-h-[150px] sm:grid sm:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-4 flex flex-row gap-1 bg-slate-100 p-2 sm:col-span-1 sm:row-span-1 sm:flex-col">
          {post.user.avatarUrl && (
            <img
              className="h-12 w-12 rounded-md object-cover sm:h-48 sm:w-full"
              src={post.user.avatarUrl}
              alt="Avatar"
            />
          )}
          <div className="flex flex-1 items-center justify-between sm:flex-col sm:items-start sm:justify-start">
            <h4 className="text-lg font-semibold">{post.user.username}</h4>
            <RoleBadge role={post.user.role} />
            <p className="hidden sm:block">
              Joined: {getYear(post.user.createdAt)}
            </p>
          </div>
        </div>
        <div className="col-span-4 h-full p-2 sm:col-span-3 lg:col-span-4">
          <PostMarkdown content={post.content} />
        </div>
      </div>
      <CardFooter className="flex justify-end gap-1">
        <Button
          className="flex items-center gap-1"
          href={`/create-post/${post.id}`}
          variant="link-button"
        >
          <TextQuote />
          Quote
        </Button>
        <DeletePostDialog action={deleteButtonClick} />
      </CardFooter>
    </div>
  );
}
