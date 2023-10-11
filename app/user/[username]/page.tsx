import { Card, CardContent, CardHeader } from '@/components/card';
import RoleBadge from '@/components/user/role-badge';
import { formatDateToUsersPreference } from '@/lib/dates';
import { getSession } from '@/lib/user-auth';
import {
  getUserAccountData,
  getUserProfileData,
} from '@/services/users-service';
import Image from 'next/image';
import { redirect } from 'next/navigation';

type PageProps = {
  params: { username: string };
};

export default async function UserPage({ params }: PageProps) {
  const { username } = await getUserProfileData(params.username);

  const session = await getSession();

  if (session?.username === username) {
    redirect(`/user/${username}/account`);
  } else {
    redirect(`/user/${username}/profile`);
  }
}
