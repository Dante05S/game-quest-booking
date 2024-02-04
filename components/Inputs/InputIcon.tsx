import React from 'react';
import clsx from 'clsx';

interface Props {
  children: React.ReactNode;
  position: 'start' | 'end';
}

export default function InputIcon({
  children,
  position
}: Props): React.JSX.Element {
  return (
    <div
      className={clsx(
        'text-slate-400 text-lg absolute inset-y-0 flex items-center',
        {
          'left-0 pl-3.5': position === 'start',
          'right-0 pr-3.5': position === 'end'
        }
      )}
    >
      {children}
    </div>
  );
}
