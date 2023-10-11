'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSession, login } from '@/lib/user-auth';

export const loginUser = async (formData: FormData) => {
  const username = formData.get('emailOrUsername') || '';
  const password = formData.get('password') || '';

  if (typeof username !== 'string' || typeof password !== 'string') {
    return {
      success: false,
      message: "Somehow you have entered something that isn't text",
    };
  }

  const response = await login(username, password);
  console.log('response.token', response.token);

  if (response?.token) {
    cookies().set({
      name: 'user_session',
      value: response?.token,
      httpOnly: true,
      path: '/',
    });
  }

  return response;
};

export const logUserOut = async () => {
  const session = await getSession();

  if (session?.isLoggedIn) {
    cookies().delete('user_session');
  }

  return redirect('/');
};
