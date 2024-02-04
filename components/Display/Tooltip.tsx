// React
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

// Components
import { type Placement } from '@popperjs/core';

// Hooks
import { usePopper } from 'react-popper';

interface Props {
  children?: React.ReactNode;
  onClose?: () => void;
  open?: boolean;
  title: React.JSX.Element | string;
  disableHoverListener?: boolean;
  placement?: Placement;
}

export default function Tooltip({
  children,
  onClose,
  open,
  title,
  placement = 'bottom',
  disableHoverListener = false
}: Props): React.JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [tooltipElement, setTooltipElement] = useState<HTMLDivElement | null>(
    null
  );

  const { styles, attributes, update } = usePopper(
    referenceElement,
    tooltipElement,
    {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8]
          }
        }
      ]
    }
  );

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (update === null || disableHoverListener) return;
    setVisible(true);
    void update();
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (update === null || disableHoverListener) return;
    setVisible(false);
    void update();
  };
  useEffect(() => {
    if (open !== undefined && update !== null) {
      if (!open && onClose !== undefined) onClose();
      setVisible(open);
      void update();
    }
  }, [open]);

  return (
    <>
      <div
        ref={setReferenceElement}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      <div
        ref={setTooltipElement}
        className={clsx({
          'invisible pointer-events-none': !visible,
          'visible pointer-events-auto z-[20]': visible
        })}
        style={styles.popper}
        {...attributes.popper}
      >
        <div
          className={clsx('transition duration-500', {
            'scale-100 opacity-100': visible,
            'scale-0 opacity-0': !visible
          })}
        >
          {typeof title === 'string' ? <span>{title}</span> : title}
        </div>
      </div>
    </>
  );
}
