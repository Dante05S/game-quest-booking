import { useContext } from 'react';
import FormControlContext, {
  type FormControlState
} from '@/context/FormControlContext';

export default function useFormControl(): FormControlState | undefined {
  return useContext(FormControlContext);
}
