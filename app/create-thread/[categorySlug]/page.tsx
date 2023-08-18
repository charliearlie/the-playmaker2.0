import { getCategoryFromSlug } from "@/services/category-service";
import Button from "@/app/components/common/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardSubheader,
} from "@/app/components/common/card";
import AdvancedInput from "@/app/components/input/advanced-input";
import { Textarea } from "@/app/components/common/textarea";
import { redirect } from "next/navigation";
import { createTopicAndInitialpost } from "@/services/topic-service";
import useUser from "@/lib/useUser";

type Props = {
  params: { categorySlug: string };
};

export default async function ForumPage({ params }: Props) {
  const user = await useUser();
  const { categorySlug } = params;
  const createTopic = async (formData: FormData) => {
    "use server";
    const title = formData.get("title") || "";
    const post = formData.get("post") || "";
    console.log(
      "title",
      "post",
      "user.id",
      "categorySlug",
      title,
      post,
      user.id,
      categorySlug
    );

    if (!user.id || typeof title !== "string" || typeof post !== "string") {
      return null;
    }

    const redirectPath = await createTopicAndInitialpost({
      categorySlug: categorySlug,
      topicTitle: title,
      postText: post,
      userId: user.id,
    });

    if (redirectPath) {
      redirect(redirectPath);
    }
  };

  const category = await getCategoryFromSlug(categorySlug);
  // todo: Redirect if category doesn't exist
  if (category) {
    return (
      <Card fillParent>
        <CardHeader>Post a new thread</CardHeader>
        <CardSubheader>Message information</CardSubheader>
        <CardContent>
          <form>
            <label className="font-semibold" htmlFor="title">
              Topic title
            </label>
            <AdvancedInput
              className="bg-slate-200 text-lg font-semibold"
              charLimit={50}
              name="title"
              type="text"
            />
            <label className="font-semibold" htmlFor="post">
              Post text
            </label>
            <Textarea
              className="bg-slate-200 font-normal text-md h-48"
              name="post"
            />
            <div className="flex justify-end py-2 gap-2">
              <Button
                className="w-32"
                variant="neutral"
                formAction={createTopic}
                type="submit"
              >
                Draft
              </Button>
              <Button
                className="w-32"
                variant="primary"
                formAction={createTopic}
                type="submit"
              >
                Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}
