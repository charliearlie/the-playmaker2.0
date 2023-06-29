"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Button from "../common/button";

type Props = {
  currentPage: number;
  numberOfPages: number;
};

/**
 * Going to take this component back to the old school a bit and control it through the URL.
 * It feels logical for it to behave that way
 */
export default function PaginationLinks({ numberOfPages }: Props) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  if (numberOfPages <= 1) return null;

  let pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);
  return (
    <div className="flex gap-1">
      {pages.map((page) => {
        const isCurrentPage = page == currentPage;
        return (
          <Button
            asLink
            href={`${pathName}?page=${page}`}
            variant="neutral"
            className={
              isCurrentPage
                ? "bg-slate-800 outline outline-blue-300 cursor-default hover:bg-slate-800"
                : ""
            }
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
}
