import { Separator } from '@/components/separator';
import { getUserProfileData } from '@/services/users-service';
import { ProfileEdit } from './components/profile-edit';
import { getSession } from '@/lib/user-auth';
import { ProfileView } from './components/profile-view';
import RoleBadge from '@/components/user/role-badge';

type PageProps = {
  params: { username: string };
};

export default async function UserProfile({ params }: PageProps) {
  const user = await getUserProfileData(params.username);
  const session = await getSession();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl mb-2 font-semibold">{user.username}</h3>
        <RoleBadge role={user.role} />
      </div>
      <Separator />
      {session?.username === user.username ? (
        <ProfileEdit userProfileData={user} />
      ) : (
        <ProfileView userProfileData={user} />
      )}
    </div>
  );
}
