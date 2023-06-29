import Link from "next/link";
import LatestPost from "../posts/latest-post";
import { Card, CardContent, CardHeader } from "../common/card";
import { Category } from "@prisma/client";
import { getTopicsPerCategory } from "@/services/topic-service";
import PaginationLinks from "../pagination/pagination-links";

type Props = {
  category: Category;
  page?: number;
};

export default async function TopicsList({ category, page = 1 }: Props) {
  const { topics, totalPages } = await getTopicsPerCategory(category.id, page);
  return (
    <div>
      <PaginationLinks currentPage={page} numberOfPages={totalPages} />
      <Card key={category.id}>
        <CardHeader canMinimise>{category.name}</CardHeader>
        <CardContent noPadding>
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-slate-400">
                <th className="w-6/12 md:w-5/12 text-start p-2">Topic</th>
                <th className="p-2 w-1/12">Replies</th>
                <th className="p-2 w-2/12">Author</th>
                <th className="hidden md:table-cell p-2 w-1/12">Views</th>
                <th className="hidden lg:table-cell md:w-2/12 p-2">
                  Latest post
                </th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic) => (
                <tr className="border-solid border-b-2 border-slate-200 last:border-b-0">
                  <td className="w-6/12 md:w-4/12 p-2 bg-slate-50 rounded-sm align-top">
                    <div className="flex flex-col justify-start">
                      <Link
                        className="text-lg underline text-slate-700 hover:text-slate-400"
                        href={`/forum/${category.slug}/${topic.slug}`}
                      >
                        {topic.title}
                      </Link>
                      Page buttons go here
                    </div>
                  </td>
                  <td className="p-2 text-center w-1/12">{topic.postCount}</td>
                  <td className="p-2 text-center bg-slate-50">
                    {topic.user.username}
                  </td>
                  <td className="hidden md:table-cell p-2 text-center md:w-1/12">
                    {topic.views}
                  </td>
                  <td className="hidden lg:table-cell p-2 text-center bg-slate-50">
                    <LatestPost
                      hideTitle={true}
                      latestPost={topic.latestPost!}
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
