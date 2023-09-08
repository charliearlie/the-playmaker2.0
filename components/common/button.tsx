import { forwardRef, type ReactNode } from 'react';
import Link from 'next/link';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center text-slate-50 justify-center rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'button-primary',
        secondary: 'button-secondary',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        neutral: 'button-neutral',
        danger: 'button-danger',
        ghost: 'button-ghost',
        link: 'button-ghost', // todo: remove this duplication
        'link-button': 'button-neutral',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  href?: string;
  type?: 'button' | 'submit' | 'reset' | undefined; // No idea why HTMLProps<HTMLButtonElement> doesn't cover this correctly
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      href,
      size,
      type = 'button',
      variant = 'primary',
      ...props
    },
    ref,
  ) => {
    if ((variant === 'link' || variant === 'link-button') && href) {
      return (
        <Link
          className={cn(buttonVariants({ variant, size, className }))}
          href={href}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), 'button')}
        ref={ref}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
