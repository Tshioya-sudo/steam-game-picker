'use client';

import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'selected';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const baseStyles = 'card-steam p-4 transition-all duration-200';

    const variants = {
      default: '',
      hover: 'hover:border-steam-blue/50 hover:scale-[1.02] cursor-pointer',
      selected: 'border-steam-blue ring-2 ring-steam-blue/50',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
