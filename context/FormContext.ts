import { type Error } from '@/interfaces/error.interface';
import { type PhoneElement } from '@/interfaces/phone_element.interface';
import { createContext } from 'react';

export interface FormState {
  values: any;
  errors: Error[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | PhoneElement) => void;
  setValuesForm: (field: string, value: string) => void;
}

const FormContext = createContext<FormState | undefined>(undefined);

export default FormContext;
