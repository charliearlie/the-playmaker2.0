'use client';
import type { HTMLProps, PropsWithChildren } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import Button from '../button';
import { useCard } from './card';

type Props = {
  canMinimise?: boolean;
} & HTMLProps<HTMLHeadingElement>;
export default function CardHeader({
  canMinimise = false,
  children,
  ...headingProps
}: PropsWithChildren<Props>) {
  const { isCollapsed, toggleCollapse } = useCard();
  return (
    <div className="flex w-full justify-between rounded-t-sm bg-slate-800 p-2 text-center text-2xl font-bold text-slate-100">
      <h2 {...headingProps}>{children}</h2>
      {canMinimise && (
        <Button
          className="p-1 text-slate-200 outline-slate-200 hover:bg-slate-400 hover:text-slate-800 "
          onClick={toggleCollapse}
          variant="ghost"
        >
          {isCollapsed ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
      )}
    </div>
  );
}
