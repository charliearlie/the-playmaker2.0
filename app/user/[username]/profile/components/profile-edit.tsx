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

const profileFormSchema = z.object({
  avatarUrl: z.string().min(2, {
    message: 'Upload failed',
  }),
  location: z.string().optional(),
  supports: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type Props = {
  userProfileData: UserProfileData;
};

export function ProfileEdit({ userProfileData }: Props) {
  const { toast } = useToast();
  const { active, avatarUrl, createdAt, location, role, supports, username } =
    userProfileData;

  const defaultValues: Partial<ProfileFormValues> = {
    avatarUrl: avatarUrl || '',
    location: location || '',
    supports: supports || '',
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  defaultValue={defaultValues.location}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supports"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supports</FormLabel>
              <FormControl>
                <Input type="text" defaultValue={defaultValues.supports} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Status</FormLabel>
          <FormControl>
            <span>{active ? 'Active' : 'Inactive'}</span>
          </FormControl>
          <FormDescription>
            Contact support to change your email address
          </FormDescription>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Role</FormLabel>
          <FormControl>
            <div className="flex gap-2 items-center">
              <RoleBadge role={role} />
              <PlaymakerLink href="">Revert to basic role</PlaymakerLink>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
