'use client';
import { createElement, type HTMLProps, type PropsWithChildren } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import Button from '../button';
import { useCard } from './card';

type Tag = 'h1' | 'h2';

type Props = {
  canMinimise?: boolean;
  tag?: Tag;
} & HTMLProps<HTMLHeadingElement>;
export default function CardHeader({
  canMinimise = false,
  children,
  ...headingProps
}: PropsWithChildren<Props>) {
  const { isCollapsed, toggleCollapse } = useCard();
  return (
    <div className="flex w-full justify-between rounded-t-sm bg-slate-800 p-2 text-center text-2xl font-bold text-slate-100">
      <CardHeaderHeading {...headingProps}>{children}</CardHeaderHeading>
      {canMinimise && (
        <Button
          className="p-1 text-slate-200 outline-slate-200 hover:bg-slate-400 hover:text-slate-800 "
          onClick={toggleCollapse}
          variant="link"
        >
          {isCollapsed ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
      )}
    </div>
  );
}

const CardHeaderHeading = ({
  children,
  tag = 'h2',
  ...props
}: HTMLProps<HTMLHeadingElement> & { tag?: Tag }) => {
  return createElement(tag, props, children);
};
