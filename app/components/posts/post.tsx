import { Post, User } from '@prisma/client';
import { TextQuote } from 'lucide-react';
import { formatDateToUsersPreference, getYear } from '@/lib/dates';
import { CardSubheader } from '../common/card';
import RoleBadge from '../user/role-badge';
import CardFooter from '../common/card/card-footer';
import Button from '../common/button';
import PostMarkdown from './post-markdown';

type Props = {
  post: Post & {
    user: User;
  };
};

export default function Post({ post }: Props) {
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
      <CardFooter className="flex justify-end">
        <Button
          className="flex items-center gap-1 py-1 font-normal"
          variant="neutral"
        >
          <TextQuote />
          Quote
        </Button>
      </CardFooter>
    </div>
  );
}
