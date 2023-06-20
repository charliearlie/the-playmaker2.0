"use client";
import { PropsWithChildren, useContext } from "react";
import { CardContext } from "./card";

type CardContentProps = {
  noPadding?: boolean;
};

type Props = PropsWithChildren<CardContentProps>;

export default function CardContent({ children, noPadding = false }: Props) {
  const { isCollapsed } = useContext(CardContext);

  return (
    <div
      className={`w-full ${noPadding ? "p-0" : "p-2"} ${
        isCollapsed ? "max-h-0 p-0" : "max-h-screen"
      } overflow-hidden transition-max-h duration-500 ease-in-out`}
    >
      {children}
    </div>
  );
}
