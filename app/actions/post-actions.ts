'use server';
import { getSession } from '@/lib/user-auth';
import { createPost } from '@/services/posts-service';
import { Post, Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const handlePostCreation = async (
  formData: FormData,
  topic: Topic,
  categorySlug: string,
) => {
  const post = formData.get('post') || '';
  const session = await getSession();

  if (!session?.id || typeof post !== 'string' || !topic) {
    // todo: handle error elegantly
    return null;
  }

  const newPost = await createPost({
    postText: post,
    topicId: topic.id,
    userId: session.id,
  });
  revalidatePath(`/forum/[categorySlug]/[topicSlug]`);
  redirect(`/forum/${categorySlug}/${topic.slug}#${newPost.id}`);
};

export const handleDelete = async (post: Post) => {
  const response = await fetch(
    `${process.env.FRONTEND_URL}/api/post/${post.id}`,
    {
      credentials: 'include',
      method: 'DELETE',
      headers: { Cookie: cookies().toString() },
    },
  );

  const { success } = await response.json();

  return success;
};
