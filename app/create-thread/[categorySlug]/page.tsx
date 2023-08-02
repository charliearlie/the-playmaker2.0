import { Suspense } from "react";
import { getCategoryFromSlug } from "@/services/category-service";
import TopicsList from "@/app/components/topic/topics-list";
import { getTopicsPerCategory } from "@/services/topic-service";
import { Breadcrumbs } from "@/app/components/breadcrumbs";
import Button from "@/app/components/common/button";
import { PlusIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardSubheader,
} from "@/app/components/common/card";

type Props = {
  params: { categorySlug: string };
};

export default async function ForumPage({ params }: Props) {
  const { categorySlug } = params;
  const category = await getCategoryFromSlug(categorySlug);
  // todo: Redirect if category doesn't exist
  if (category) {
    return (
      <Card fillParent>
        <CardHeader>Post a new thread</CardHeader>
        <CardSubheader>Message information</CardSubheader>
        <CardContent></CardContent>
      </Card>
    );
  }
}
