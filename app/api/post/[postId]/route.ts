import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { getSession } from '@/lib/user-auth';
import { getPost, removePost } from '@/services/posts-service';

type DeleteParams = {
  params: {
    postId: string;
  };
};

export async function DELETE(request: NextRequest, { params }: DeleteParams) {
  const session = await getSession();
  const post = await getPost(params.postId);
  const canUserDeletePost = session?.id === post?.userId;

  if (canUserDeletePost) {
    const deletedPost = await removePost(params.postId);

    revalidatePath('/forum/[categorySlug]/[topicSlug]');
    return NextResponse.json({ success: deletedPost });
  }
  return NextResponse.json({ success: false });
}
