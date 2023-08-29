import Image from 'next/image';
import Link from 'next/link';
import HeaderSearchAndMenu from './header-search-and-menu';
import SubHeader from './sub-header';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 rounded-b-md border-gray-200 bg-slate-900">
      <div className="mx-1 flex flex-wrap items-center justify-between p-2 md:mx-8">
        <Link href="/" className="flex items-center">
          <Image
            className="h-10 w-40"
            src="/playma10.png"
            alt="The Playmaker logo"
            width={180}
            height={100}
          />
        </Link>
        <HeaderSearchAndMenu />
      </div>
      <div className="hidden h-12 items-center bg-slate-700 px-8 md:flex">
        <SubHeader />
      </div>
    </header>
  );
}
