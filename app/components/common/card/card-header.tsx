"use client";
import { PropsWithChildren, useContext } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Button from "../button";
import { CardContext } from "./card";

type Props = {
  canMinimise?: boolean;
};
export default function CardHeader({
  canMinimise = false,
  children,
}: PropsWithChildren<Props>) {
  const { isCollapsed, toggleCollapse } = useContext(CardContext);
  return (
    <div className="flex justify-between rounded-t-sm bg-slate-800 p-2 text-center text-slate-100 text-2xl font-bold">
      <h2>{children}</h2>
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
