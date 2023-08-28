'use client';
import { PropsWithChildren } from 'react';

type Props = {
  className?: string;
};

export default function CardFooter({
  children,
  className = '',
}: PropsWithChildren<Props>) {
  return (
    <div
      className={`flex bg-slate-200 text-center text-lg font-semibold 'max-h-screen p-2 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
