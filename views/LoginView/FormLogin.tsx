import Button from '@/components/Buttons/Button';
import Form from '@/components/Form';
import InputIcon from '@/components/Inputs/InputIcon';
import TextField from '@/components/Inputs/TextField';
import ShowPassword from '@/components/ShowPassword';
import { type ValidationField } from '@/helpers/Validator';
import { type LoginUser } from '@/models/User.interface';
import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import validationsPassword from '@/utils/validationsPassword';
import AuthService from '@/services/AuthService';
import { responseIsOk } from '@/helpers/request';
import useAlertControl from '@/hooks/userAlertControl';
import { useRouter } from 'next/router';

const INIT_USER: LoginUser = {
  email: '',
  password: ''
};

const validations: ValidationField = {
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

  const login = async (user: LoginUser): Promise<void> => {
    const authService = new AuthService();
    const response = await authService.login(user);
    if (!responseIsOk(response.success, response.data)) {
      openAlert('error', response.errors);
      setLoading(false);
      return;
    }
    openAlert('success', ['Inicio de sesión completado de forma exitosa']);
    await authService.setCookieEmail(user.email);
    setTimeout(() => {
      void redirectTo();
    }, 800);
  };

  const handleSubmit = (user: LoginUser): void => {
    setLoading(true);
    void login(user);
  };

  return (
    <div className="mt-1 w-full xs:max-w-md xxs:px-3">
      <Form
        initValues={INIT_USER}
        onSubmit={handleSubmit}
        validations={validations}
      >
        <div className="flex flex-col gap-4 w-full">
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
            placeholder="Ingresa tu contraseña"
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
            Iniciar sesión
          </Button>
        </div>
      </Form>
    </div>
  );
}
