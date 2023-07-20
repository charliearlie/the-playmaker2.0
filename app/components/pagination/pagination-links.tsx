"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Button from "../common/button";
import { useMemo } from "react";

type Props = {
  currentPage: number;
  maxPagesShown?: number;
  numberOfPages: number;
};

/**
 * Going to take this component back to the old school a bit and control it through the URL.
 * It feels logical for it to behave that way
 */
export default function PaginationLinks({
  maxPagesShown = 5,
  numberOfPages,
}: Props) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const getPagesToDisplay = () => {
    const isCurrentPageFirstPage = currentPage === 1;
    const isCurrentPageLastPage = currentPage === numberOfPages;
    const doesNumberOfPagesExceedMaxNumberOfPages =
      numberOfPages > maxPagesShown;

    if (!doesNumberOfPagesExceedMaxNumberOfPages) {
      return Array.from({ length: numberOfPages }, (_, i) => i + 1);
    }

    if (isCurrentPageFirstPage) {
      return Array.from({ length: maxPagesShown }, (_, i) => i + 1).concat([
        numberOfPages,
      ]);
    }

    if (isCurrentPageLastPage) {
      const lastPageMinusFive = currentPage - 4;
      if (lastPageMinusFive < 1) {
        return Array.from({ length: maxPagesShown }, (_, i) => i + 1);
      }

      return [1].concat(
        Array.from({ length: maxPagesShown }, (_, i) => lastPageMinusFive + i)
      );
    }

    /**
     * TODO:
     Logic for a mid page like page 4 of 8
     We want to display pages 1... 3 4 5 ... 8 maybe?
     Will revisit the logic
     * 
     */

    return Array.from({ length: numberOfPages }, (_, i) => i + 1);
  };

  const pages = useMemo(
    () => getPagesToDisplay(),
    [currentPage, getPagesToDisplay]
  );
  if (numberOfPages <= 1) return null;

  return (
    <div className="flex gap-1">
      {pages.map((page) => {
        const isCurrentPage = page == currentPage;
        return (
          <Button
            key={page}
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
