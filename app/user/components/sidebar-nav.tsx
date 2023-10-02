'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/button';

export function SidebarNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // This works but there HAS to be a better way
  const userId = pathname.split('/')[2];
  console.log('userId', `/user/${userId}/profile`);
  const sidebarNavItems = [
    {
      title: 'Profile',
      href: `/user/${userId}/profile`,
    },
    {
      title: 'Account',
      href: `/user/${userId}/account`,
    },
    {
      title: 'Posts',
      href: `/user/${userId}/posts`,
    },
    {
      title: 'Topics',
      href: `/user/${userId}/topics`,
    },
    {
      title: 'Display',
      href: '/examples/forms/display',
    },
  ];

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
