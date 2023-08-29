'use client';
import { PropsWithChildren, createContext } from 'react';
import type { UserResponse } from '../user-auth';

export const UserContext = createContext<UserResponse | null>(null);

export default function UserProvider({
  children,
  isLoggedIn,
  username,
}: PropsWithChildren<UserResponse>) {
  return (
    <UserContext.Provider value={{ isLoggedIn, username }}>
      {children}
    </UserContext.Provider>
  );
}
