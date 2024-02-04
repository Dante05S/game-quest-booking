import React from 'react';

export default function SpinnerPong(): React.JSX.Element {
  return (
    <div className="flex w-full h-16 justify-center items-center">
      <span
        className="relative block h-[40px] w-[6px] paddles text-[#ffffff] before:content-['']
      before:absolute before:left-0 before:right-0 before:top-[15px]
      before:w-[12px] before:h-[12px] before:bg-primary before:rounded-full"
      />
    </div>
  );
}
