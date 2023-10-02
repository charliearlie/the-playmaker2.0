import { Separator } from '@/components/separator';
import { getUserProfileData } from '@/services/users-service';
import { ProfileEdit } from './components/profile-edit';

type PageProps = {
  params: { userId: string };
};

export default async function UserProfile({ params }: PageProps) {
  const user = await getUserProfileData(params.userId);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          This is your personal account data
        </p>
      </div>
      <Separator />
      <ProfileEdit userProfileData={user} />
    </div>
  );
}
