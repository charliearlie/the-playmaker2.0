'use client';
import { useState } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AlertTriangleIcon } from 'lucide-react';

import Button from '@/components/common/button';
import FormField from '@/components/form/form-field';
import { Card, CardContent } from '@/components/common/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/common/alert';
import { useToast } from '@/components/common/toast/use-toast';

import { loginUser } from '../../actions/user-actions';

type PageProps = {
  searchParams?: {
    callback: string;
  };
};

export default function SignIn({ searchParams }: PageProps) {
  const [message, setMessage] = useState<string>('');
  const { toast } = useToast();
  const { pending } = useFormStatus();

  async function onLogin(formData: FormData) {
    const res = await loginUser(formData);
    if (res.success) {
      toast({ title: 'You have logged in successfully', variant: 'success' });
      redirect(`${searchParams?.callback || '/'}`);
    } else if (res.message) {
      toast({ title: 'Log in failed', variant: 'destructive' });
      setMessage(res.message);
    }
  }

  return (
    <Card>
      <CardContent>
        {message && (
          <Alert className="rounded-sm" variant="destructive">
            <AlertTriangleIcon />
            <AlertTitle>Log in failed</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <div className="mb-4 flex w-full flex-col items-center pb-10 pt-6 sm:px-8">
          <h1 className="pb-8 pt-4 text-center text-3xl font-bold">Log in</h1>
          <form action={onLogin} className="w-auto md:w-80">
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
              <Button name="login" variant="primary" type="submit">
                {pending ? 'Logging in' : 'Log in'}
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
  );
}
