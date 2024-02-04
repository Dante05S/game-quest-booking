import { type ValidationSchema } from '@/helpers/Validator/types/ValidationSchema';

const validationsPassword: ValidationSchema[] = [
  {
    validation: 'required',
    helperText: 'La contraseña es obligatoria'
  },
  {
    validation: 'min',
    params: {
      length: 8
    },
    helperText: 'La contraseña debe ser de al menos 8 caracteres'
  },
  {
    validation: 'digit',
    helperText: 'Debe contener al menos un numero (0-9)'
  },
  {
    validation: 'letter',
    helperText: 'Debe contener al menos un caracter (a-z)'
  },
  {
    validation: 'upper_letter',
    helperText: 'Debe contener una letra mayuscula'
  },
  {
    validation: 'lower_letter',
    helperText: 'Debe contener una letra miniscula'
  }
];

export default validationsPassword;
