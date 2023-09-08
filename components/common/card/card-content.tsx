'use client';
import { PropsWithChildren } from 'react';
import { useCard } from './card';

type CardContentProps = {
  className?: string;
  noPadding?: boolean;
};

type Props = PropsWithChildren<CardContentProps>;

export default function CardContent({
  children,
  className = '',
  noPadding = false,
}: Props) {
  const { isCollapsed } = useCard();

  return (
    <div
      className={`w-full ${
        isCollapsed ? 'max-h-0' : 'max-h-screen'
      } transition-max-h overflow-hidden duration-500 ease-in-out ${className} ${
        noPadding || isCollapsed ? 'p-0' : 'p-2'
      }`}
    >
      {children}
    </div>
  );
}
