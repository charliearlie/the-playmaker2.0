'use client';
import { PropsWithChildren, createContext, useContext } from 'react';
import type { UserResponse } from '../user-auth';

type UserData = {
  user: UserResponse | null;
};

export const UserContext = createContext<UserData>({ user: null });

export default function UserProvider({
  children,
  user,
}: PropsWithChildren<UserData>) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export const useClientUser = () => {
  const user = useContext(UserContext);
  return user;
};
