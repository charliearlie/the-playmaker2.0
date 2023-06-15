import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

type Props = {
  className?: string;
} & LinkProps;

export default function PlaymakerLink({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Link
      className={`underline font-semibold text-slate-700 hover:text-slate-400 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
