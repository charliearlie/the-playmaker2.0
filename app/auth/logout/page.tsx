import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function LogoutPage() {
  cookies().delete('user_session');
  return redirect('/');
}
