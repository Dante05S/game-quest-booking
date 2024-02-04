/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-function */
// React
import React, { useEffect, useMemo, useState } from 'react';

// Interfaces
import { type Error } from '@/interfaces/error.interface';
import FormContext from '@/context/FormContext';

// Helpers
import {
  getParamsByOption,
  getValidatorByOption,
  type ValidationField
} from '@/helpers/Validator';
import { type PhoneElement } from '@/interfaces/phone_element.interface';

interface FormProps {
  children: React.ReactNode;
  initValues: any;
  onChangeErrors?: (errors: Error[]) => void;
  onSubmit: (data: any) => void;
  validations?: ValidationField;
}

export default function Form({
  children,
  initValues,
  onChangeErrors = () => {},
  onSubmit,
  validations = {}
}: FormProps): React.JSX.Element {
  const [localErrors, setLocalErrors] = useState<Error[]>([]);
  const [values, setValues] = useState<any>({});

  const getValues = (name: string, value: string): any => {
    return {
      ...values,
      [name]: value
    };
  };

  const setValuesForm = (field: string, value: string): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    setValues((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | PhoneElement
  ): void => {
    const { name, value } = e.target;
    const newValues = getValues(name, value);
    setValues(newValues);
  };

  const childContext = useMemo(() => {
    return {
      values,
      errors: localErrors,
      handleChange,
      setValuesForm
    };
  }, [values, localErrors]);

  const validateFields = (): Error[] => {
    const errors: Error[] = [];
    const fields = Object.keys(validations);

    fields.forEach((field) => {
      validations[field].forEach((validation) => {
        const option = validation.validation;
        const key = field as keyof typeof values;
        const params = getParamsByOption(option, (validation as any).params);
        if (!getValidatorByOption(option, values[key], params)) {
          errors.push({ field, error: validation.helperText });
        }
      });
    });

    onChangeErrors(errors);
    setLocalErrors(errors);
    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const errors = validateFields();
    if (errors.length > 0) return;
    onSubmit(values);
  };

  useEffect(() => {
    setValues(initValues);
  }, [initValues]);

  return (
    <FormContext.Provider value={childContext}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
