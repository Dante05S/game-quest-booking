import React from 'react';
import { MdClose } from 'react-icons/md';

export default function Error(): React.JSX.Element {
  return (
    <div className="flex items-center">
      <div className="w-20 h-20 rounded-full z-0 absolute scale-110 animate-circle-anim bg-error" />
      <div
        className="w-20 h-20 flex items-center justify-center rounded-full z-10 relative
      bg-secondary scale-100 animate-error-anim"
      >
        <MdClose className="text-6xl text-error" />
      </div>
    </div>
  );
}
