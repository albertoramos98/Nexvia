import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(
  ({ className, variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';

    const variants = {
      default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      hero: 'bg-brand-gradient text-navy font-semibold shadow-glow hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all',
      whatsapp: 'bg-whatsapp text-whatsapp-foreground font-semibold shadow-lg hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all',
      glass: 'glass border border-border text-foreground hover:border-cyan/50 hover:bg-foreground/5 transition-all',
      outline: 'border border-border text-muted-foreground hover:border-cyan/50 hover:text-foreground',
      secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    };

    const sizes = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-11 rounded-xl px-8 text-base',
      xl: 'h-12 rounded-xl px-6 text-base font-medium'
    };

    const combinedClassName = cn(
      baseStyles,
      variants[variant] || variants.default,
      sizes[size] || sizes.default,
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(combinedClassName, children.props.className),
        ref,
        ...props
      });
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

