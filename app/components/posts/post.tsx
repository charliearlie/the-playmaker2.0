"use client";
import { Post, User } from "@prisma/client";
import { CardSubheader } from "../common/card";
import { formatDateToUsersPreference, getYear } from "@/lib/dates";
import RoleBadge from "../user/role-badge";
import CardFooter from "../common/card/card-footer";
import Button from "../common/button";
import { TextQuote } from "lucide-react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
            <p className="hidden sm:block">
              Joined: {getYear(post.user.createdAt)}
            </p>
          </div>
        </div>
        <div className="h-full col-span-4 sm:col-span-3 lg:col-span-4 p-2">
          <ReactMarkdown
            children={post.content}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    style={atomDark}
                    language="javascript"
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
              img({ alt, src, ...props }) {
                return (
                  <img
                    className="max-w-48 max-h-96"
                    src={src}
                    alt={alt}
                    {...props}
                  />
                );
              },
            }}
          />
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
