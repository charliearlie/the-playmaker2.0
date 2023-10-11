'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Button from '@/components/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form';
import { Input } from '@/components/input';
import { useToast } from '@/components/toast/use-toast';
import { UserProfileData } from '@/services/users-service';
import RoleBadge from '@/components/user/role-badge';
import PlaymakerLink from '@/components/link/link';
import { getYear } from '@/lib/dates';

type Props = {
  userProfileData: UserProfileData;
};

export function ProfileView({ userProfileData }: Props) {
  const { toast } = useToast();
  const { active, avatarUrl, createdAt, location, role, supports, username } =
    userProfileData;

  return (
    <div>
      <div className="grid grid-cols-2">
        <p>Member since</p>
        <p>{getYear(createdAt)}</p>
      </div>
      <div className="grid grid-cols-2">
        <p>Location</p>
        <p>{location}</p>
      </div>
      <div className="grid grid-cols-2">
        <p>Supports</p>
        <p>{supports}</p>
      </div>
    </div>
  );
}
