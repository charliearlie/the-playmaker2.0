"use client";
import { PropsWithChildren, useContext } from "react";
import { CardContext } from "./card";

type Props = {
  className?: string;
};

export default function CardFooter({
  children,
  className = "",
}: PropsWithChildren<Props>) {
  const { isCollapsed } = useContext(CardContext);
  return (
    <div
      className={`flex bg-slate-200 text-center text-lg font-semibold ${
        isCollapsed ? "max-h-0 p-0" : "max-h-screen p-2"
      } overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
