import React, { useMemo } from 'react';
import FormControlContext from '@/context/FormControlContext';

export interface FormControlProps {
  children: React.ReactNode;
  error?: boolean;
  required?: boolean;
}

export default function FormControl({
  children,
  error = false,
  required = false
}: FormControlProps): React.JSX.Element {
  const childContext = useMemo(() => {
    return {
      error,
      required
    };
  }, [error, required]);

  return (
    <FormControlContext.Provider value={childContext}>
      <div className="flex h-full w-full flex-col">{children}</div>
    </FormControlContext.Provider>
  );
}
