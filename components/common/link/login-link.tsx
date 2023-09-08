import * as React from 'react';
import type { LinkProps } from 'next/link';

import Link from './link';
import { cn } from '@/lib/utils';

type Props = {
  callback?: string;
  className?: string;
} & Omit<LinkProps, 'href'>;

export const LoginLink = async ({
  className,
  callback,
  children,
  ...props
}: React.PropsWithChildren<Props>) => {
  const callbackParam = callback ? `?callback=${callback}` : '';
  return (
    <Link
      // className={cn(alertVariants({ variant }), className)}
      href={`/auth/login${callbackParam}`}
      {...props}
    >
      {children}
    </Link>
  );
};
LoginLink.displayName = 'LoginLink';

export const LoginLinkText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
LoginLinkText.displayName = 'LoginLinkText';
