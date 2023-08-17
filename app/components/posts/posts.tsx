import { Post, User } from "@prisma/client";
import { PostComponent } from ".";
import { Card, CardHeader } from "../common/card";

type Props = {
  posts: (Post & {
    user: User;
  })[];
  topicTitle: string;
};

export default function Posts({ posts, topicTitle }: Props) {
  return (
    <Card>
      <CardHeader>{topicTitle}</CardHeader>
      <ul>
        {posts.map((post) => (
          <li
            className="border-solid border-b-[16px] border-slate-600 last:border-b-0"
            key={post.id}
          >
            <PostComponent post={post} />
          </li>
        ))}
      </ul>
    </Card>
  );
}