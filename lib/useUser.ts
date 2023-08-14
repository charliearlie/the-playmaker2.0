import { cookies } from "next/headers";
import { getSession } from "./user-auth";

type User = {
  email?: string;
  username?: string;
  isLoggedIn: boolean;
  id?: string;
};
export default async function useUser() {
  const cookie = cookies().get("user_session");

  if (cookie?.value) {
    const data = await getSession(cookie.value);
    if (data) {
      return {
        isLoggedIn: true,
        ...data,
      } as User;
    }
  }

  return { isLoggedIn: false };
}
