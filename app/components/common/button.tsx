import type { HTMLProps, ReactNode } from "react";
import classNames from "classnames";
import Link from "next/link";

type ButtonProps = {
  asLink?: boolean;
  children: ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset" | undefined; // No idea why HTMLProps<HTMLButtonElement> doesn't cover this correctly
  variant?: "primary" | "secondary" | "neutral" | "danger" | "ghost";
};
type Props = ButtonProps & HTMLProps<HTMLButtonElement>;

export default function Button({
  asLink = false,
  children,
  className,
  href,
  type = "button",
  variant = "primary",
  ...props
}: Props) {
  const variantClass = classNames(
    "button",
    {
      "button-primary": variant === "primary",
      "button-secondary": variant === "secondary",
      "button-neutral": variant === "neutral",
      "button-danger": variant === "danger",
      "button-ghost": variant === "ghost",
    },
    className
  );

  if (asLink && href) {
    return (
      <Link className={variantClass} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={variantClass} type={type} {...props}>
      {children}
    </button>
  );
}
