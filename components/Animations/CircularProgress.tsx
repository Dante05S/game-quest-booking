import React from 'react';
import clsx from 'clsx';

interface Props {
  size?: number;
  color?: 'primary' | 'error';
}

export default function CircularProgress({
  size = 41,
  color = 'primary'
}: Props): JSX.Element {
  return (
    <div
      className="lds-ring inline-block relative"
      style={{
        width: size,
        height: size
      }}
    >
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className={clsx(
            'border-box block absolute m-2 rounded-[50%] animate-ring border-[3px] border-solid',
            {
              'border-[theme(colors.primary.DEFAULT)_transparent_transparent_transparent]':
                color === 'primary'
            }
          )}
          style={{
            width: size - 16,
            height: size - 16
          }}
        />
      ))}
    </div>
  );
}
