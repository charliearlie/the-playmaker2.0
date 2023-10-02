import { Card, CardContent, CardHeader } from '@/components/card';
import RoleBadge from '@/components/user/role-badge';
import { formatDateToUsersPreference } from '@/lib/dates';
import {
  getUserAccountData,
  getUserProfileData,
} from '@/services/users-service';
import Image from 'next/image';

type PageProps = {
  params: { userId: string };
};

export default async function UserPage({ params }: PageProps) {
  const { active, avatarUrl, createdAt, feedbackScore, role, username } =
    await getUserProfileData(params.userId);

  const profileImage = avatarUrl || 'hello.jpg';
  return (
    <div className="w-full">
      <Card>
        <CardHeader tag="h1">User profile</CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row">
            <img
              className="w-full h-80 object-cover sm:object-contain md:h-auto md:w-80 rounded-lg shadow-lg border-2 border-slate-700 border-solid"
              src={profileImage}
              alt={`${username} avatar`}
            />
          </div>
          <div className="">
            <p>{username}</p>
            <RoleBadge role={role} />
            <p>Joined: {formatDateToUsersPreference(createdAt)}</p>
            <p>Score: {feedbackScore}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
