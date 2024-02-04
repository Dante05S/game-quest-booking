import React from 'react';

export default function SuccesCheck(): React.JSX.Element {
  return (
    <div className="mx-0 my-auto w-20 h-20">
      <div className="relative box-content w-20 h-20">
        <span className="h-[5px] block rounded-md absolute z-10 top-[46px] left-[14px] w-[25px] rotate-45 animate-line-tip bg-primary-font"></span>
        <span className="h-1.5 block rounded-md absolute z-10 top-[38px] right-2 w-[47px] -rotate-45 animate-line-long bg-primary-font"></span>
      </div>
    </div>
  );
}
