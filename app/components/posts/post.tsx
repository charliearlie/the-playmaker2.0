import { Post, User } from "@prisma/client";
import { Card, CardContent, CardSubheader } from "../common/card";
import { formatDateToUsersPreference, getYear } from "@/lib/dates";
import RoleBadge from "../user/role-badge";
import CardFooter from "../common/card/card-footer";
import Button from "../common/button";
import { TextQuote } from "lucide-react";

type Props = {
  post: Post & {
    user: User;
  };
};

export default function Post({ post }: Props) {
  return (
    <div>
      <CardSubheader>
        {formatDateToUsersPreference(post.createdAt)}
      </CardSubheader>
      <div className="min-h-[150px] sm:grid sm:grid-cols-4 lg:grid-cols-5">
        <div className="bg-slate-100 col-span-4 sm:row-span-1 sm:col-span-1 p-2 flex flex-row sm:flex-col gap-1">
          {post.user.avatarUrl && (
            <img
              className="w-12 h-12 sm:w-full sm:h-48 object-cover rounded-md"
              src={post.user.avatarUrl}
              alt="Avatar"
            />
          )}
          <div className="flex sm:flex-col flex-1 items-center sm:items-start justify-between sm:justify-start">
            <h4 className="font-semibold text-lg">{post.user.username}</h4>
            <RoleBadge role={post.user.role} />
          </div>
          <p className="hidden sm:block">
            Joined: {getYear(post.user.createdAt)}
          </p>
        </div>
        <div className="h-full col-span-4 sm:col-span-3 lg:col-span-4 p-2">
          {post.content}
        </div>
      </div>
      <CardFooter className="flex justify-end">
        <Button
          className="py-1 font-normal flex gap-1 items-center"
          variant="neutral"
        >
          <TextQuote />
          Quote
        </Button>
      </CardFooter>
    </div>
  );
}
