import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import Button from '../../components/common/button';
import FormField from '../../components/form/form-field';
import { Card, CardContent } from '../../components/common/card';
import { register } from '@/lib/user-auth';

export default function RegisterPage() {
  const registerUser = async (formData: FormData) => {
    'use server';
    const username = formData.get('username') || '';
    const email = formData.get('email') || '';
    const password = formData.get('password') || '';

    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return null;
    }

    const response = await register({ email, password, username });
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
            <h1 className="pb-8 pt-4 text-center text-3xl font-bold">
              Join The-Playmaker
            </h1>
            <form className="w-auto md:w-80" action={registerUser}>
              <FormField label="Username" name="username" type="text" />
              <FormField label="Email" name="email" type="text" />
              <FormField label="Password" name="password" type="password" />
              <div className="flex flex-col md:flex-row md:justify-between">
                <Button
                  className="w-25"
                  variant="primary"
                  type="submit"
                  formAction={registerUser}
                >
                  Sign up
                </Button>
                <Link
                  className="px-0 py-2 font-semibold text-blue-500 hover:text-slate-500"
                  href="/auth/login"
                >
                  Already registered?
                </Link>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
