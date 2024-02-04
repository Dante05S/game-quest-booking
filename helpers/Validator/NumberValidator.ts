import { regexDigit } from '@/utils/regex';

export interface NumberValidator {
  isNumber: (value: any) => boolean;
  isDigit: (value: any) => boolean;
}

const isNumber = (value: number): boolean => {
  return !isNaN(value);
};

const isDigit = (value: any): boolean => {
  return regexDigit.test(value as string);
};

const number: NumberValidator = {
  isNumber,
  isDigit
};

export default number;
