import { useContext } from 'react';
import AlertControlContext, {
  type AlertControlState
} from '@/context/AlertControlContext';

export default function useAlertControl(): AlertControlState {
  return useContext(AlertControlContext);
}
