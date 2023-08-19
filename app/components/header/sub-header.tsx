import { search } from '@/app/actions';
import Link from 'next/link';

export default function SubHeader() {
  return (
    <div className="flex w-full justify-between">
      <nav className="flex gap-1">
        <Link href="/" className="bg-slate-800 px-4 py-2 text-gray-200">
          Home
        </Link>
        <button className="bg-slate-800 px-4 py-2 text-gray-200">Search</button>
        <button className="bg-slate-800 px-4 py-2 text-gray-200">Rules</button>
        <Link href="/login" className="bg-slate-800 px-4 py-2 text-gray-200">
          Log in
        </Link>
        <Link href="/register" className="bg-slate-800 px-4 py-2 text-gray-200">
          Register
        </Link>
      </nav>
      <div className="relative w-64">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-gray-500"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <form action={search}>
          <input
            type="text"
            id="search-navbar"
            name="searchTerm"
            className="block w-full rounded-lg border border-slate-500 bg-slate-900 p-2 pl-10 text-sm text-gray-300 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search..."
          />
        </form>
      </div>
    </div>
  );
}
