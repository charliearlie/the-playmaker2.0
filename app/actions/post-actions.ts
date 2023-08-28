'use server';
import { Post } from '@prisma/client';
import { cookies } from 'next/headers';

const handleDelete = async (post: Post) => {
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

export { handleDelete };
