import { ImgHTMLAttributes } from "react";
import Link from "next/link";

type CardImageProps = {
  to: string;
};

type Props = ImgHTMLAttributes<HTMLImageElement> & CardImageProps;

export default function CardImage({ to, ...imageProps }: Props) {
  return (
    <Link href={to} className="flex w-full cursor-pointer rounded">
      <img
        className="h-60 w-full rounded-t-lg"
        loading="lazy"
        height="15rem"
        width="100%"
        {...imageProps}
      />
    </Link>
  );
}
