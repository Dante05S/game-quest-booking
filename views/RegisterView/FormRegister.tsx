import Form from '@/components/Form';
import InputIcon from '@/components/Inputs/InputIcon';
import TextField from '@/components/Inputs/TextField';
import { AiFillIdcard } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import React, { useState } from 'react';
import ShowPassword from '@/components/ShowPassword';
import Button from '@/components/Buttons/Button';
import { type ValidationField } from '@/helpers/Validator';
import validationsPassword from '@/utils/validationsPassword';
import { type RegisterUser } from '@/models/User.interface';
import useAlertControl from '@/hooks/userAlertControl';
import AuthService from '@/services/AuthService';
import { responseIsOk } from '@/helpers/request';
import { useRouter } from 'next/router';

const INIT_USER: RegisterUser = {
  first_name: '',
  last_name: '',
  email: '',
  password: ''
};

const validations: ValidationField = {
  first_name: [
    {
      validation: 'required',
      helperText: 'El nombre es obligatorio'
    }
  ],
  last_name: [
    {
      validation: 'required',
      helperText: 'El apellido es obligatorio'
    }
  ],
  email: [
    {
      validation: 'required',
      helperText: 'El email es obligatorio'
    },
    {
      validation: 'email',
      helperText: 'El email es invalido'
    }
  ],
  password: validationsPassword
};

export default function FormLogin(): React.JSX.Element {
  const { openAlert } = useAlertControl();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const redirectTo = async (): Promise<void> => {
    await router.push('/code-verification');
    setLoading(false);
  };

  const register = async (user: RegisterUser): Promise<void> => {
    setLoading(true);
    const authService = new AuthService();
    const response = await authService.register(user);
    if (!responseIsOk(response.success, response.data)) {
      openAlert('error', response.errors);
      setLoading(false);
      return;
    }
    openAlert('success', ['Registro completado de forma exitosa']);
    await authService.setCookieEmail(user.email);
    setTimeout(() => {
      void redirectTo();
    }, 800);
  };

  const handleSubmit = (user: RegisterUser): void => {
    void register(user);
  };

  return (
    <div className="mt-1 w-full xs:w-fit xxs:px-3">
      <Form
        initValues={INIT_USER}
        onSubmit={handleSubmit}
        validations={validations}
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col items-start xs:flex-row gap-4 xs:gap-7">
            <TextField
              id="first_name"
              name="first_name"
              label="Nombre"
              placeholder="Ingresa el nombre"
              endIcon={
                <InputIcon position="end">
                  <AiFillIdcard className="text-xl" />
                </InputIcon>
              }
              required
            />

            <TextField
              id="last_name"
              name="last_name"
              label="Apellidos"
              placeholder="Ingresa los apellidos"
              endIcon={
                <InputIcon position="end">
                  <AiFillIdcard className="text-xl" />
                </InputIcon>
              }
            />
          </div>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            required
            placeholder="Ingresa tu email"
            endIcon={
              <InputIcon position="end">
                <MdEmail className="text-xl" />
              </InputIcon>
            }
          />
          <TextField
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Contraseña"
            placeholder="Ingresa la contraseña"
            required
            endIcon={
              <InputIcon position="end">
                <ShowPassword
                  show={showPassword}
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                />
              </InputIcon>
            }
          />
        </div>
        <div className="w-full mt-9">
          <Button type="submit" variant="rounded" loading={loading}>
            Crear cuenta
          </Button>
        </div>
      </Form>
    </div>
  );
}
