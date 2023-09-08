import { Role } from '@prisma/client';
import { CrownIcon, HammerIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  role: Role;
};

export default function RoleBadge({ role }: Props) {
  const baseClass =
    'flex items-center justify-center p-1 rounded-md font-semibold gap-1 w-24';
  switch (role) {
    case Role.ADMIN:
      return (
        <span className={cn(baseClass, 'bg-green-900 text-white')}>
          <CrownIcon />
          Admin
        </span>
      );
    case Role.MODERATOR:
      return (
        <span className={cn(baseClass, 'bg-orange-700 text-white')}>
          <HammerIcon />
          Mod
        </span>
      );
    default:
      return null;
  }
}
