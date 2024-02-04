// Validators
import string, { type StringValidator } from './StringValidator';
import number, { type NumberValidator } from './NumberValidator';

// Types
import { type ValidationSchema } from './types/ValidationSchema';
import { type Options } from './types/Options';
import {
  type ParamsMatch,
  type ParamsMin,
  type ParamsSelectOf
} from './interfaces/Params';

export type ValidationField = Record<string, ValidationSchema[]>;
type Params = ParamsSelectOf | ParamsMin | ParamsMatch;

interface Validator {
  string: StringValidator;
  number: NumberValidator;
}

const validator: Validator = {
  string,
  number
};

export const getParamsByOption = (
  option: string,
  params: any
): Params | undefined => {
  switch (option) {
    case 'min':
      return params as ParamsMin;
  }
};

export const getValidatorByOption = (
  option: Options,
  value: any,
  params?: Params
): boolean => {
  const {
    required,
    isEmail,
    minlength,
    oneLetter,
    oneLowerLetter,
    oneUpperLetter
  } = validator.string;
  const { isDigit } = validator.number;

  switch (option) {
    case 'required':
      return required(value as string);
    case 'email':
      return isEmail(value as string);
    case 'min':
      return minlength(value as string, params as ParamsMin);
    case 'digit':
      return isDigit(value as number);
    case 'letter':
      return oneLetter(value as string);
    case 'lower_letter':
      return oneLowerLetter(value as string);
    case 'upper_letter':
      return oneUpperLetter(value as string);
  }
};

export default validator;
