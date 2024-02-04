/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import React, { forwardRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

// Iconss
import useAside from '@/hooks/useAside';
import HeaderAside from './HeaderAside';

interface Props {
  children: React.ReactNode;
}

const ContentAside = forwardRef<HTMLDivElement, Props>(function ContentAside(
  { children },
  ref
): React.JSX.Element | null {
  const { show, toggle, full, position, header, padding, stickyHeader } =
    useAside();
  const [mounted, setMounted] = useState<boolean>(true);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return mounted
    ? createPortal(
        <>
          <div
            onClick={() => {
              if (show) toggle();
            }}
            className="bg-pane fixed bottom-0 right-0 w-full h-full z-[46]"
          />

          <div
            ref={ref}
            className={clsx(
              'fixed z-50 top-0 bg-secondary text-secondary-font',
              'h-full shadow-md',
              {
                'w-full xs:w-96': !full,
                'w-full': full,
                'left-0': position === 'left',
                'right-0': position === 'right'
              }
            )}
          >
            {stickyHeader && header ? (
              <div className="relative scroll bg-inherit h-full">
                <HeaderAside />
                {children}
              </div>
            ) : (
              <>
                {header && <HeaderAside />}
                <div
                  className={clsx('scroll bg-inherit', {
                    'p-3 pt-0': padding,
                    'h-[calc(100%_-_64px)]': header,
                    'h-full': !header
                  })}
                >
                  {children}
                </div>
              </>
            )}
          </div>
        </>,
        document.getElementById('aside') as HTMLElement
      )
    : null;
});

export default ContentAside;
