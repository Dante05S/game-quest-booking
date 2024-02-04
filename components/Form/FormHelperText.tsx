import React from 'react';
import clsx from 'clsx';
import useFormControl from '@/hooks/useFormControl';
import getFormControlState from '@/utils/formControlState';

interface Props {
  children: React.ReactNode;
  error?: boolean;
}

export default function FormHelperText({
  children,
  error
}: Props): React.JSX.Element {
  const muiFormControl = useFormControl();

  const formControlState = getFormControlState(
    { error },
    ['error'],
    muiFormControl
  );
  return (
    <>
      {children !== undefined && (
        <span
          className={clsx('my-1.5 ml-2 text-[0.7rem]', {
            'text-error before:content-["*"]': formControlState.error,
            'text-primary opacity-50': !(formControlState.error ?? false)
          })}
        >
          {children}
        </span>
      )}
    </>
  );
}
