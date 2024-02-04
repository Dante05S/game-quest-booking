/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { type Severity } from '@/types/severity.type';

export interface AlertControlState {
  messages: string[];
  severity: Severity;
  openAlert: (severety: Severity, messages: string[]) => void;
}

const initState: AlertControlState = {
  messages: [],
  severity: 'success',
  openAlert: (severety: Severity, messages: string[]) => {}
};

const AlertControlContext = createContext<AlertControlState>(initState);

export default AlertControlContext;
