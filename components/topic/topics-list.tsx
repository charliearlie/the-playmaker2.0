import Link from 'next/link';
import LatestPost from '../posts/latest-post';
import { Card, CardContent, CardHeader } from '../common/card';
import { Category } from '@prisma/client';
import { EnrichedTopic } from '@/services/topic-service';
import PaginationLinks from '../pagination/pagination-links';

type Props = {
  category?: Category;
  page?: number;
  topics: EnrichedTopic[];
  totalPages?: number;
};

export default async function TopicsList({
  category,
  page = 1,
  topics,
  totalPages = 0,
}: Props) {
  return (
    <div>
      <PaginationLinks currentPage={page} numberOfPages={totalPages} />
      <Card>
        {category && <CardHeader canMinimise>{category.name}</CardHeader>}
        <CardContent noPadding>
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-slate-400">
                <th className="w-6/12 p-2 text-start md:w-5/12">Topic</th>
                <th className="w-1/12 p-2">Replies</th>
                <th className="w-2/12 p-2">Author</th>
                <th className="hidden w-1/12 p-2 md:table-cell">Views</th>
                <th className="hidden p-2 md:w-2/12 lg:table-cell">
                  Latest post
                </th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic) => (
                <tr
                  key={topic.id}
                  className="border-b-2 border-solid border-slate-200 last:border-b-0"
                >
                  <td className="w-6/12 rounded-sm bg-slate-50 p-2 align-top md:w-4/12">
                    <div className="flex flex-col justify-start">
                      <Link
                        className="text-lg text-slate-700 underline hover:text-slate-400"
                        href={`/forum/${topic.categorySlug}/${topic.slug}`}
                      >
                        {topic.title}
                      </Link>
                      Page buttons go here
                    </div>
                  </td>
                  <td className="w-1/12 p-2 text-center">{topic.postCount}</td>
                  <td className="bg-slate-50 p-2 text-center">
                    {topic.user.username}
                  </td>
                  <td className="hidden p-2 text-center md:table-cell md:w-1/12">
                    {topic.views}
                  </td>
                  <td className="hidden bg-slate-50 p-2 text-center lg:table-cell">
                    <LatestPost
                      hideTitle={true}
                      latestPost={topic.latestPost!}
                      topicTitle={topic.title}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <PaginationLinks currentPage={page} numberOfPages={totalPages} />
    </div>
  );
}
