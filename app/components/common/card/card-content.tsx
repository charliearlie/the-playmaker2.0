'use client';
import { PropsWithChildren, useContext } from 'react';
import { CardContext } from './card';

type CardContentProps = {
  className?: string;
  noPadding?: boolean;
};

type Props = PropsWithChildren<CardContentProps>;

export default function CardContent({ children, className, noPadding = false }: Props) {
  const { isCollapsed } = useContext(CardContext);

  return (
    <div
      className={`w-full ${noPadding ? 'p-0' : 'p-2'} ${
        isCollapsed ? 'max-h-0 p-0' : 'max-h-screen'
      } transition-max-h overflow-hidden duration-500 ease-in-out ${className}`}
    >
      {children}
    </div>
  );
}
