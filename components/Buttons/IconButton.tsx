import React from 'react';
import clsx from 'clsx';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'solid' | 'plain';
}

export default function IconButton({
  children,
  color = 'primary',
  disabled = false,
  type = 'button',
  variant = 'solid',
  ...rest
}: Props): React.JSX.Element {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx('text-2xl leading-none transition duration-300', {
        'rounded-full w-fit h-fit p-1.5': variant === 'solid',
        'hover:text-primary-font hover:bg-primary':
          color === 'primary' && variant === 'solid',
        'hover:text-secondary-font hover:bg-secondary':
          color === 'secondary' && variant === 'solid',
        'hover:text-primary': color === 'primary' && variant === 'plain',
        'hover:text-secondary': color === 'secondary' && variant === 'plain',
        'text-neutral-300 hover:bg-transparent hover:text-neutral-300': disabled
      })}
      {...rest}
    >
      {children}
    </button>
  );
}
