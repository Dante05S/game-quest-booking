import React, { useEffect, useRef } from 'react';

// Components
import { CSSTransition } from 'react-transition-group';
import ContentAside from './ContentAside';
import AsideProvider from '@/context/AsideContext/AsideProvider';
import { type IconType } from 'react-icons';
import { IoIosArrowBack } from 'react-icons/io';

interface Props {
  children: React.ReactNode;
  show: boolean;
  toggle: () => void;
  position?: 'left' | 'right';
  padding?: boolean;
  full?: boolean;
  header?: boolean;
  labelHeader?: string | React.JSX.Element;
  iconHeader?: IconType;
  stickyHeader?: boolean;
}

export default function Aside({
  children,
  show,
  toggle,
  position = 'left',
  padding = true,
  full = false,
  header = true,
  labelHeader = '',
  iconHeader = IoIosArrowBack,
  stickyHeader = false
}: Props): React.JSX.Element | null {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      document.body.className += ' overflow-hidden';
    } else {
      document.body.className = document.body.className.replace(
        ' overflow-hidden',
        ''
      );
    }
  }, [show]);

  return (
    <CSSTransition
      in={show}
      nodeRef={nodeRef}
      timeout={500}
      classNames={position}
      unmountOnExit
    >
      <AsideProvider
        toggle={toggle}
        position={position}
        padding={padding}
        show={show}
        full={full}
        header={header}
        labelHeader={labelHeader}
        iconHeader={iconHeader}
        stickyHeader={stickyHeader}
      >
        <ContentAside ref={nodeRef}>{children}</ContentAside>
      </AsideProvider>
    </CSSTransition>
  );
}
