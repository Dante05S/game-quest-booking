import React from 'react';
import { AsideContext } from '.';
import { type IconType } from 'react-icons';
import { IoIosArrowBack } from 'react-icons/io';

interface Props {
  show: boolean;
  toggle: () => void;
  position?: 'left' | 'right';
  padding?: boolean;
  full?: boolean;
  header?: boolean;
  labelHeader?: string | React.JSX.Element;
  iconHeader?: IconType;
  stickyHeader?: boolean;
  children: React.ReactNode;
}

export default function AsideProvider({
  show,
  toggle,
  position = 'left',
  padding = true,
  full = false,
  header = true,
  labelHeader = '',
  iconHeader = IoIosArrowBack,
  stickyHeader = false,
  children
}: Props): React.JSX.Element {
  return (
    <AsideContext.Provider
      value={{
        show,
        toggle,
        position,
        padding,
        full,
        header,
        labelHeader,
        iconHeader,
        stickyHeader
      }}
    >
      {children}
    </AsideContext.Provider>
  );
}
