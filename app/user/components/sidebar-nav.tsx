'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/button';
import { getSession } from '@/lib/user-auth';
import { useClientUser } from '@/lib/contexts/user-context';

export function SidebarNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const { user } = useClientUser();
  // This works but there HAS to be a better way
  const username = pathname.split('/')[2];
  const sidebarNavItems = [
    {
      title: 'Profile',
      href: `/user/${username}/profile`,
    },
    {
      title: 'Posts',
      href: `/user/${username}/posts`,
    },
    {
      title: 'Topics',
      href: `/user/${username}/topics`,
    },
  ];

  if (user?.username === username) {
    sidebarNavItems.unshift({
      title: 'Account',
      href: `/user/${username}/account`,
    });
  }

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className,
      )}
      {...props}
    >
      {sidebarNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname.includes(item.title.toLowerCase())
              ? 'bg-slate-700 hover:bg-slate-700 text-slate-50'
              : '',
            'justify-start',
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
