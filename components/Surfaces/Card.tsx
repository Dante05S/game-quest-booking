import clsx from 'clsx';
import React from 'react';

interface Props {
  children: React.ReactNode;
  spacing?: string;
  height?: string;
  overflowHidden?: boolean;
}

export default function Card({
  children,
  spacing = 'p-2',
  height = 'h-fit',
  overflowHidden = true
}: Props): React.JSX.Element {
  return (
    <div
      className={clsx(
        'w-full flex flex-col rounded-lg text-primary-font blur-lg saturate-[180%]',
        'bg-[rgba(88,_82,_214,_0.15)] [filter:_drop-shadow(0_30px_10px_rgba(0,0,0,0.125))]',
        spacing,
        height,
        {
          'overflow-hidden': overflowHidden
        }
      )}
    >
      {children}
    </div>
  );
}
