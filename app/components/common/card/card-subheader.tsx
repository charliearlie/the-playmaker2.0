'use client';
import { PropsWithChildren, useContext } from 'react';
import { CardContext } from './card';

type Props = {
  className?: string;
};

export default function CardSubHeader({
  children,
  className = '',
}: PropsWithChildren<Props>) {
  const { isCollapsed } = useContext(CardContext);
  return (
    <div
      className={`flex bg-slate-300 text-center text-lg font-semibold ${
        isCollapsed ? 'max-h-0 p-0' : 'max-h-screen px-2 py-1'
      } overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
