import { Separator } from '@/components/separator';
import { getUserAccountData } from '@/services/users-service';
import { AccountEdit } from './components/account-edit';

type PageProps = {
  params: { username: string };
};

export default async function UserAccount({ params }: PageProps) {
  const user = await getUserAccountData(params.username);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          This is your personal account data
        </p>
      </div>
      <Separator />
      <AccountEdit userAccountData={user} />
    </div>
  );
}
