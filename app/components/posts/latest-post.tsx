import PlaymakerLink from "../common/link";
import { ArrowRightFromLine } from "lucide-react";
import dayjs from "dayjs";
import { Post, User } from "@prisma/client";

type Props = {
  hideTitle?: boolean;
  latestPost: Post & {
    user: User;
  };
  topicTitle: string;
};

export default function LatestPost({
  hideTitle = false,
  latestPost,
  topicTitle,
}: Props) {
  if (!latestPost) {
    return <p>No posts yet</p>;
  }

  return (
    <div className="flex flex-col items-start">
      {!hideTitle && <PlaymakerLink href="/">{topicTitle}</PlaymakerLink>}
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
