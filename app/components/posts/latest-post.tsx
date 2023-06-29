import { Post, Topic, User } from "@prisma/client";
import PlaymakerLink from "../common/link";
import { ArrowRightFromLine } from "lucide-react";
import dayjs from "dayjs";

type Props = {
  hideTitle?: boolean;
  latestPost: Post & {
    user: User;
    topic: Topic;
  };
};

export default function LatestPost({ hideTitle = false, latestPost }: Props) {
  if (!latestPost) {
    return <p>No posts yet</p>;
  }

  return (
    <div className="flex flex-col items-start">
      {!hideTitle && (
        <PlaymakerLink href="/">{latestPost?.topic.title}</PlaymakerLink>
      )}
      <p className="text-sm">
        {dayjs(latestPost?.createdAt).format("ddd DD MMM, YYYY HH:mm")}
      </p>
      <div className="flex gap-1">
        <PlaymakerLink className="text-xs" href="/">
          {latestPost?.user.username}
        </PlaymakerLink>
        <PlaymakerLink className="text-xs" href="/">
          <ArrowRightFromLine height={16} className="text-xs font-bold" />
        </PlaymakerLink>
      </div>
    </div>
  );
}