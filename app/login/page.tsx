import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import Button from '../components/common/button';
import FormField from '../components/form/form-field';
import { Card, CardContent } from '../components/common/card';

import { login } from '@/lib/user-auth';

export default function SignIn() {
  const loginUser = async (formData: FormData) => {
    'use server';
    const username = formData.get('emailOrUsername') || '';
    const password = formData.get('password') || '';

    if (typeof username !== 'string' || typeof password !== 'string') {
      return null;
    }

    const response = await login(username, password);
    if (response?.token) {
      cookies().set({
        name: 'user_session',
        value: response?.token,
        httpOnly: true,
        path: '/',
      });
    }
    redirect('/');
  };

  return (
    <>
      <Card>
        <CardContent>
          <div className="mb-4 flex w-full flex-col items-center pb-10 pt-6 sm:px-8">
            <h1 className="pb-8 pt-4 text-center text-3xl font-bold">Log in</h1>
            <form className="w-auto md:w-80">
              <FormField
                label="Email or username" // Could default label to input name with a capital letter?
                name="emailOrUsername"
                type="text"
                required
              />
              <FormField
                label="Password"
                name="password"
                type="password"
                required
              />
              <div className="flex flex-col">
                <Button
                  name="login"
                  variant="primary"
                  type="submit"
                  formAction={loginUser}
                >
                  Log in
                </Button>
                <Link
                  className="px-0 pb-2 font-semibold text-blue-500 hover:text-slate-500"
                  href="/user/forgot-password"
                >
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
