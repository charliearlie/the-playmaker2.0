import Card from "../common/card/card";
import CardContent from "../common/card/card-content";
import CardHeader from "../common/card/card-header";
import { getGroupData } from "@/app/services/group";
import Link from "next/link";

export default async function Groups() {
  const groups = await getGroupData();
  return (
    <div className="w-full">
      {groups.map((group) => (
        <Card>
          <CardHeader canMinimise>{group.name}</CardHeader>
          <CardContent noPadding>
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-slate-400">
                  <th className="w-8/12 md:w-6/12 text-start p-2">Forum</th>
                  <th className="p-2">Topics</th>
                  <th className="p-2">Posts</th>
                  <th className="hidden md:block p-2">Latest post</th>
                </tr>
              </thead>
              <tbody className="p-2">
                {group.categories.map((category) => (
                  <tr>
                    <td className="w-8/12 md:w-6/12 p-2 bg-slate-50 rounded-sm">
                      <div className="">
                        <Link
                          className="text-lg underline text-slate-700 font-bold"
                          href={`/forum/${category.name}`}
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
                    <td className="hidden md:table-cell p-2 text-center">
                      Post by kyro7
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
