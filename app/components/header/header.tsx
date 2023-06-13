import Image from "next/image";
import Link from "next/link";
import HeaderSearchAndMenu from "./header-search-and-menu";
import SubHeader from "./sub-header";

export default function Header() {
  return (
    <header className="border-gray-200 z-10 sticky top-0 rounded-b-md bg-slate-900">
      <div className="flex flex-wrap items-center mx-1 md:mx-8 p-2 justify-between">
        <Link href="/" className="flex items-center">
          <Image
            className="-mt-2 h-10 w-40"
            src="/playma10.png"
            alt="The Playmaker logo"
            width={180}
            height={100}
          />
        </Link>
        <HeaderSearchAndMenu />
      </div>
      <div className="h-12 px-8 items-center bg-slate-700 hidden md:flex">
        <SubHeader />
      </div>
    </header>
  );
}
