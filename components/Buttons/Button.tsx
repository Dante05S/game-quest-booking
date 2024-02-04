import React, { forwardRef } from 'react';
import clsx from 'clsx';
import CircularProgress from '../Animations/CircularProgress';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'primary' | 'error';
  variant?: 'rounded' | 'contained' | 'sharp' | 'outlined';
  opacity?: string;
  font?: string;
  padding?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    children,
    color = 'primary',
    variant = 'contained',
    font = 'text-md',
    padding = 'p-1.5',
    opacity = 'opacity-100',
    loading = false,
    disabled = false,
    ...rest
  },
  ref
): React.JSX.Element {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled || loading}
      className={clsx(
        'w-full h-full transition duration-300 disabled:bg-tertiary',
        'disabled:text-tertiary-font/50',
        font,
        opacity,
        padding,
        {
          'text-primary-font bg-primary hover:text-primary-font hover:bg-primary-dark':
            color === 'primary' && variant !== 'outlined',
          'text-primary-font bg-error hover:text-primary-font hover:bg-error-dark':
            color === 'error' && variant !== 'outlined',
          'text-primary-font bg-transparent outline outline-2 outline-primary hover:text-primary-font hover:bg-primary hover:outline-none':
            color === 'primary' && variant === 'outlined',
          'text-primary-font bg-transparent border-2 border-error hover:text-primary-font hover:bg-error-dark hover:border-none':
            color === 'error' && variant === 'outlined',
          'rounded-lg': variant === 'contained',
          'rounded-none': variant === 'sharp',
          'rounded-full': variant === 'rounded' || variant === 'outlined'
        }
      )}
      {...rest}
    >
      <div className="flex items-center justify-center">
        {loading && (
          <div className="flex justify-center mr-1">
            <CircularProgress color={color} />
          </div>
        )}
        {children}
      </div>
    </button>
  );
});

export default Button;
