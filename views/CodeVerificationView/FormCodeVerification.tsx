import { useRouter } from 'next/router';
import React, { useState } from 'react';
import CodeInputs, { type ICodeInputs } from './CodeInputs';
import usePage from '@/hooks/usePage';
import { type CodeVerificationProps } from '@/interfaces/pages/code_verification_props.interface';
import AuthService from '@/services/AuthService';
import { responseIsOk } from '@/helpers/request';
import Button from '@/components/Buttons/Button';
import TimerCode from './TimerCode';
import useAlertControl from '@/hooks/userAlertControl';
import { useDispatch } from 'react-redux';
import { postTokenThunk, setUser } from '@/redux/slices/userSlice';
import { type AppDispatch } from '@/redux/store';

export default function FormCodeVerification(): React.JSX.Element {
  const { props } = usePage<CodeVerificationProps>();
  const dispatch = useDispatch<AppDispatch>();
  const { openAlert } = useAlertControl();
  const router = useRouter();
  const [codeInputs, setCodeInputs] = useState<ICodeInputs>({
    sms_token1: '',
    sms_token2: '',
    sms_token3: '',
    sms_token4: ''
  });
  const [loading, setLoading] = useState(false);

  const handleCodeInputs = (newCodeInputs: ICodeInputs): void => {
    setCodeInputs(newCodeInputs);
  };

  const redirectTo = async (): Promise<void> => {
    await router.push('/#events');
    setLoading(false);
  };

  const login = async (): Promise<void> => {
    setLoading(true);
    const data = {
      email: props.email,
      code_token: `${codeInputs.sms_token1}${codeInputs.sms_token2}${codeInputs.sms_token3}${codeInputs.sms_token4}`
    };

    // Login user
    const authService = new AuthService();
    const response = await authService.validateCode(data);
    if (!responseIsOk(response.success, response.data)) {
      openAlert('error', response.errors);
      setLoading(false);
      return;
    }

    const responseData = response.data!;

    // Set cookie token session

    const token = await dispatch(postTokenThunk(responseData.token));
    if (token === null) {
      openAlert('error', ['Error inesperado al intentar iniciar sesión']);
      setLoading(false);
      return;
    }

    await authService.deleteCookieEmail();

    // Set global state app
    dispatch(setUser(responseData.user));

    openAlert('success', [
      'Codigo verificado correctamente. Iniciando sesión...'
    ]);
    setTimeout(() => {
      void redirectTo();
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void login();
  };
  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <div className="flex flex-col w-full items-center gap-6">
        <CodeInputs codeInputs={codeInputs} onChange={handleCodeInputs} />
        <Button type="submit" loading={loading}>
          Validar código
        </Button>
        <TimerCode />
      </div>
    </form>
  );
}
