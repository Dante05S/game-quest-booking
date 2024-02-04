import { useContext } from 'react';
import FormContext, { type FormState } from '@/context/FormContext';

export default function useForm(): FormState | undefined {
  return useContext(FormContext);
}
