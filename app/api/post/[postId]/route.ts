import { getSession } from '@/lib/user-auth';
import { getPost, removePost } from '@/services/posts-service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

type DeleteParams = {
  params: {
    postId: string;
  };
};

export async function DELETE(request: NextRequest, { params }: DeleteParams) {
  const session = await getSession();
  console.log('session', session, 'request', request);
  const post = await getPost(params.postId);
  const canUserDeletePost = session?.id === post?.userId;

  if (canUserDeletePost) {
    const deletedPost = await removePost(params.postId);

    revalidatePath('/forum/[categorySlug]/[topicSlug]');
    return NextResponse.json({ success: deletedPost });
  }
  return NextResponse.json({ success: false });
}