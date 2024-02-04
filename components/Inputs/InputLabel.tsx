import React from 'react';
import clsx from 'clsx';
import useFormControl from '@/hooks/useFormControl';
import getFormControlState from '@/utils/formControlState';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
  error?: boolean;
  color?: 'primary' | 'primary-font';
}

export default function InputLabel({
  children,
  required,
  error,
  color = 'primary-font',
  ...rest
}: Props): React.JSX.Element {
  const muiFormControl = useFormControl();

  const formControlState = getFormControlState(
    { error, required },
    ['error', 'required'],
    muiFormControl
  );

  return (
    <label
      htmlFor=""
      className={clsx('my-1.5 pl-1 text-xs font-medium', {
        'text-error': formControlState.error,
        'text-primary-font':
          !(formControlState.error ?? false) && color === 'primary-font',
        'text-primary':
          !(formControlState.error ?? false) && color === 'primary',
        'before:content-["*"] before:text-primary before:mr-1':
          formControlState.required
      })}
      {...rest}
    >
      {children}
    </label>
  );
}
