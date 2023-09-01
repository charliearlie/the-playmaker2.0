import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

type Props = {
  className?: string;
} & LinkProps;

export default function PlaymakerLink({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Link
      className={`font-semibold text-slate-700 underline hover:text-slate-400 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
