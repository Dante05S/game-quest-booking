import { createContext } from 'react';
import { type FormControlProps } from '@/components/Form/FormControl';

type ContextFromPropsKey = 'error' | 'required';

export interface FormControlState
  extends Pick<FormControlProps, ContextFromPropsKey> {}

const FormControlContext = createContext<FormControlState | undefined>(
  undefined
);

export default FormControlContext;
