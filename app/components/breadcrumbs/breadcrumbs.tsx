"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { slugMap } from "./slug-map";

type Props = {
  optionalCrumb?: string;
};

// TODO: a lot to do here
export default function Breadcrumbs({ optionalCrumb }: Props) {
  const pathName = usePathname();

  const segments = pathName.split("/").filter((str) => Boolean(str));
  return (
    <div className="flex gap-1">
      <Link href="/">
        <HomeIcon />
      </Link>
      {segments.map((segment) => {
        const { href, name } = slugMap(segment);
        return (
          <>
            <ChevronRightIcon />
            <Link href={href}>{name}</Link>
          </>
        );
      })}
      {optionalCrumb && (
        <>
          <ChevronRightIcon />
          <span>{optionalCrumb}</span>
        </>
      )}
    </div>
  );
}
