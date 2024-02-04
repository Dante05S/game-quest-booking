import { regexEmail, regexLetter, regexLower, regexUpper } from '@/utils/regex';
import { type ParamsMin } from './interfaces/Params';

export interface StringValidator {
  isString: (value: any) => boolean;
  required: (value: string) => boolean;
  minlength: (value: string, params: ParamsMin) => boolean;
  maxlength: (value: string, maxLength: number) => boolean;
  isEmail: (value: string) => boolean;
  oneLetter: (value: string) => boolean;
  oneLowerLetter: (value: string) => boolean;
  oneUpperLetter: (value: string) => boolean;
}

const isString = (value: any): boolean => {
  return typeof value === 'string';
};

const required = (value: string): boolean => {
  return value.trim().length > 0;
};

const minlength = (value: string, params: ParamsMin): boolean => {
  const { length } = params;
  return value.length >= length;
};

const maxlength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

const isEmail = (value: string): boolean => {
  return regexEmail.test(value);
};

const oneLetter = (value: string): boolean => {
  return regexLetter.test(value);
};

const oneLowerLetter = (value: string): boolean => {
  return regexLower.test(value);
};

const oneUpperLetter = (value: string): boolean => {
  return regexUpper.test(value);
};

const string: StringValidator = {
  isString,
  required,
  minlength,
  maxlength,
  isEmail,
  oneLetter,
  oneLowerLetter,
  oneUpperLetter
};

export default string;
