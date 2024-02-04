/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { type IconType } from 'react-icons';
import { IoIosArrowBack } from 'react-icons/io';

export interface AsideState {
  show: boolean;
  toggle: () => void;
  position: 'left' | 'right';
  padding: boolean;
  full: boolean;
  header: boolean;
  labelHeader: string | React.JSX.Element;
  iconHeader: IconType;
  stickyHeader: boolean;
}

export const initState: AsideState = {
  show: false,
  toggle: () => {},
  position: 'left',
  padding: true,
  full: false,
  header: true,
  labelHeader: '',
  iconHeader: IoIosArrowBack,
  stickyHeader: false
};
export const AsideContext = createContext<AsideState>(initState);
