import React, { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  onClickAway: () => void;
}

export default function ClickAwayListener({
  children,
  onClickAway
}: Props): React.JSX.Element {
  const referenceElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickAway = (e: MouseEvent): void => {
      if (referenceElement.current === null) return;
      if (!e.composedPath().includes(referenceElement.current)) {
        onClickAway();
      }
    };
    window.addEventListener('click', clickAway);

    return () => {
      window.removeEventListener('click', clickAway);
    };
  }, []);
  return <div ref={referenceElement}>{children}</div>;
}
