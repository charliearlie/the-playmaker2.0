"use client";
import { PropsWithChildren, useContext } from "react";
import { CardContext } from "./card";

type Props = {
  className?: string;
};

export default function CardSubHeader({
  children,
  className = "",
}: PropsWithChildren<Props>) {
  const { isCollapsed } = useContext(CardContext);
  return (
    <div
      className={`flex bg-slate-300 text-center text-lg font-semibold ${
        isCollapsed ? "max-h-0 p-0" : "max-h-screen py-1 px-2"
      } overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
