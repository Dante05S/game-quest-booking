import clsx from 'clsx';
import React from 'react';

interface Props {
  children: React.ReactNode;
  horizontal?: 'left' | 'right';
  vertical?: 'top' | 'bottom';
  variant?: 'standard' | 'dot';
  color?: 'primary' | 'secondary' | 'success';
  badgeContent?: string | number;
  max?: number;
  overlap?: 'circular' | 'rectangular';
}

export default function Badge({
  children,
  color = 'primary',
  badgeContent,
  max = 9,
  horizontal = 'right',
  vertical = 'top',
  variant = 'standard',
  overlap = 'circular'
}: Props): React.JSX.Element {
  return (
    <div className="relative">
      <div
        className={clsx('absolute z-10 rounded-full px-1.5 text-xs', {
          'bg-primary text-secondary-font': color === 'primary',
          'bg-secondary text-secondary-font': color === 'secondary',
          'bg-success text-secondary-font': color === 'success',
          'h-4 min-w-4': variant === 'standard',
          'w-3.5 h-3.5': variant === 'dot',
          'right-0.5': horizontal === 'right' && overlap === 'circular',
          '-right-2': horizontal === 'right' && overlap === 'rectangular',
          'left-0.5': horizontal === 'left' && overlap === 'circular',
          '-left-2': horizontal === 'left' && overlap === 'rectangular',
          'top-0': vertical === 'top' && overlap === 'circular',
          '-top-1.5': vertical === 'top' && overlap === 'rectangular',
          'bottom-0': vertical === 'bottom' && overlap === 'circular',
          '-bottom-1.5': vertical === 'bottom' && overlap === 'rectangular'
        })}
      >
        {variant === 'standard' && (
          <>
            {typeof badgeContent === 'number' ? (
              <>{badgeContent > max ? `${max}+` : badgeContent}</>
            ) : (
              badgeContent
            )}
          </>
        )}
      </div>
      {children}
    </div>
  );
}
