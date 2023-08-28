import { Post, User } from '@prisma/client';
import PostComponent from './post';
import { Card, CardHeader } from '../common/card';

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
            className="border-b-[16px] border-solid border-slate-600 last:border-b-0"
            key={post.id}
          >
            <PostComponent post={post} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
