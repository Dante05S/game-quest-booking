import React, { forwardRef, type HTMLInputTypeAttribute } from 'react';
import clsx from 'clsx';
import useFormControl from '@/hooks/useFormControl';
import getFormControlState from '@/utils/formControlState';
import Input, { type RefInputElement, type InputProps } from './Input';

export interface FieldProps extends InputProps {
  rounded?: string;
  startIcon?: React.JSX.Element;
  endIcon?: React.JSX.Element;
  id: string;
  type?: HTMLInputTypeAttribute;
  variant?: 'contained' | 'code';
  styleInput?: 'textField' | 'inputCode';
  color?: string;
  fontColor?: string;
  error?: boolean;
  name?: string;
  fontSize?: string;
}

const Field = forwardRef<RefInputElement, FieldProps>(function Field(
  {
    rounded = 'rounded-lg',
    startIcon,
    endIcon,
    type = 'text',
    variant = 'contained',
    styleInput = 'textField',
    color = 'bg-tertiary',
    fontColor = 'text-secondary-font',
    error,
    name = '',
    fontSize = 'text-sm',
    ...rest
  },
  ref
): React.JSX.Element {
  const muiFormControl = useFormControl();

  const formControlState = getFormControlState(
    { error },
    ['error'],
    muiFormControl
  );

  return (
    <div className="relative block">
      {startIcon}
      <Input
        ref={ref}
        type={type}
        name={name}
        className={clsx(fontColor, rounded, styleInput, fontSize, {
          'pl-10 pr-10': startIcon !== undefined && endIcon !== undefined,
          'pr-3 pl-10': startIcon !== undefined && endIcon === undefined,
          'pl-3 pr-10': endIcon !== undefined && startIcon === undefined,
          [`${color} focus:border`]: variant === 'contained',
          'border border-error': formControlState.error
        })}
        {...rest}
      />
      {endIcon}
    </div>
  );
});

export default Field;
