/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  toggle: () => void;
  breakPointWidth?: string;
}

export default function Modal({
  children,
  isOpen,
  toggle,
  breakPointWidth = 'sm:w-96'
}: Props): React.JSX.Element | null {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return isOpen
    ? createPortal(
        <div className="bg-pane fixed top-0 right-0 h-full w-full z-[20] sm:flex sm:justify-center sm:items-center">
          <div
            id="pane"
            className="h-full w-full absolute"
            onClick={() => {
              toggle();
            }}
          />
          <div
            className={clsx(
              'rounded-lg max-h-[70%] scroll w-full flex flex-col bg-secondary shadow-sm animate-popup fixed bottom-0',
              'sm:relative',
              breakPointWidth
            )}
          >
            <div className="py-4 flex flex-col text-center items-center">
              <div className="sm:max-h-[570px]">{children}</div>
            </div>
          </div>
        </div>,
        document.getElementById('modal') as HTMLElement
      )
    : null;
}
