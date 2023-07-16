import { Post, Topic, User } from "@prisma/client";
import PlaymakerLink from "../common/link";
import { ArrowRightFromLine } from "lucide-react";
import dayjs from "dayjs";

type Props = {
  createdAt: string;
  hideTitle?: boolean;
  title: string;
  username: string;
};

export default function LatestPost({
  createdAt,
  hideTitle = false,
  title,
  username,
}: Props) {
  if (!title) {
    return <p>No posts yet</p>;
  }

  return (
    <div className="flex flex-col items-start">
      {!hideTitle && <PlaymakerLink href="/">{title}</PlaymakerLink>}
      <p className="text-sm">
        {dayjs(createdAt).format("ddd DD MMM, YYYY HH:mm")}
      </p>
      <div className="flex gap-1">
        <PlaymakerLink className="text-xs" href="/">
          {username}
        </PlaymakerLink>
        <PlaymakerLink className="text-xs" href="/">
          <ArrowRightFromLine height={16} className="text-xs font-bold" />
        </PlaymakerLink>
      </div>
    </div>
  );
}
