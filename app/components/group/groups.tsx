import Link from "next/link";
import LatestPost from "../posts/latest-post";

import { getGroupData } from "@/services/groups-service";
import { Card, CardContent, CardHeader } from "../common/card";

export default async function Groups() {
  const groups = await getGroupData();
  return (
    <div>
      {groups.map((group) => (
        <Card key={group.id}>
          <CardHeader canMinimise>{group.name}</CardHeader>
          <CardContent noPadding>
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-slate-400">
                  <th className="w-8/12 md:w-6/12 text-start p-2">Forum</th>
                  <th className="p-2">Topics</th>
                  <th className="p-2">Posts</th>
                  <th className="hidden md:table-cell p-2 md:w-3/12">
                    Latest post
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* for some reason on Vercel this category is
                implicitly `any` when it is typed...

                @ts-ignore */}
                {group.categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-solid border-b-2 border-slate-200 last:border-b-0"
                  >
                    <td className="w-8/12 md:w-6/12 p-2 bg-slate-50 rounded-sm align-top">
                      <div className="flex flex-col justify-start">
                        <Link
                          className="text-lg underline text-slate-700 font-bold hover:text-slate-400"
                          href={`/forum/${category.slug}`}
                        >
                          {category.name}
                        </Link>
                        <p className="text-xs">{category.description}</p>
                      </div>
                    </td>
                    <td className="p-2 text-center">{category.topicCount}</td>
                    <td className="p-2 text-center bg-slate-50">
                      {category.postCount}
                    </td>
                    <td className="hidden md:table-cell p-2 text-center md:w-3/12">
                      <LatestPost
                        latestPost={category.latestPost!}
                        topicTitle={category.latestPost?.topic.title!}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
