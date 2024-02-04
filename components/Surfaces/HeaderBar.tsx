import clsx from 'clsx';
import React from 'react';

interface Props {
  children: React.ReactNode;
  sticky?: boolean;
}

export default function HeaderBar({
  children,
  sticky = false
}: Props): React.JSX.Element {
  return (
    <div
      className={clsx(
        'flex items-center bg-[rgba(0,0,0,0.6)] w-full h-16 px-2 backdrop-blur-sm',
        {
          'sticky z-10 top-0': sticky
        }
      )}
    >
      {children}
    </div>
  );
}
