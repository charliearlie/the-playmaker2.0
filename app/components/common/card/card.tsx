"use client";
import { createContext, useState, type PropsWithChildren } from "react";

type CardContextValue = {
  isCollapsed: boolean;
  toggleCollapse: () => void;
};

export const CardContext = createContext<CardContextValue>({
  isCollapsed: false,
  toggleCollapse: () => {},
});

export default function Card({ children }: PropsWithChildren) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed((prevState) => !prevState);

  const value = { isCollapsed, toggleCollapse };
  return (
    <CardContext.Provider value={value}>
      <div className="my-2 flex bg-white flex-col rounded-sm shadow shadow-gray-500 focus:outline-4 focus:outline-blue-400">
        {children}
      </div>
    </CardContext.Provider>
  );
}
