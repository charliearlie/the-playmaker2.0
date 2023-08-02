"use client";
import classNames from "classnames";
import { createContext, useState, type PropsWithChildren } from "react";

type CardContextValue = {
  isCollapsed: boolean;
  toggleCollapse: () => void;
};

export const CardContext = createContext<CardContextValue>({
  isCollapsed: false,
  toggleCollapse: () => {},
});

type Props = PropsWithChildren<{
  fillParent?: boolean;
}>;

export default function Card({ children, fillParent }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed((prevState) => !prevState);

  const value = { isCollapsed, toggleCollapse };

  const className = classNames(
    "my-2 flex bg-white flex-col rounded-sm shadow shadow-gray-500 focus:outline-4 focus:outline-blue-400",
    {
      "w-full": fillParent,
    }
  );
  return (
    <CardContext.Provider value={value}>
      <div className={className}>{children}</div>
    </CardContext.Provider>
  );
}
