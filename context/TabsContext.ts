/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export interface TabsState {
  value: string;
  onChange?: (newValue: string) => void;
  onChangeWitdthLine: (width: number) => void;
  onChangeOffsetLeft: (offset: number) => void;
}

const initState: TabsState = {
  value: '',
  onChangeWitdthLine: (width: number) => {},
  onChangeOffsetLeft: (offset: number) => {}
};

const TabsContext = createContext<TabsState>(initState);

export default TabsContext;
