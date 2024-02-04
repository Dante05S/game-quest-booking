import React, { useState } from 'react';

// Hooks
import useTimer from '@/hooks/useTimer';
import AuthService from '@/services/AuthService';
import usePage from '@/hooks/usePage';
import { type CodeVerificationProps } from '@/interfaces/pages/code_verification_props.interface';
import { responseIsOk } from '@/helpers/request';
import useAlertControl from '@/hooks/userAlertControl';
import CircularProgress from '@/components/Animations/CircularProgress';

export default function TimerCode(): JSX.Element {
  const { props } = usePage<CodeVerificationProps>();
  const { openAlert } = useAlertControl();
  const { timer, startTimer } = useTimer(60);
  const [loading, setLoading] = useState<boolean>(false);

  const resendCode = async (): Promise<void> => {
    setLoading(true);
    const authService = new AuthService();
    const response = await authService.resendCode(props.email);
    if (!responseIsOk(response.success, response.data, true)) {
      openAlert('error', response.errors);
      setLoading(false);
      return;
    }
    openAlert('success', [
      'Codigo de verificación reenviado, revisa tu correo electronico'
    ]);
    setLoading(false);
    startTimer();
  };

  return (
    <div className="flex flex-col gap-1 items-center">
      <span className="text-base font-light">¿No recibiste tu código?</span>
      {timer !== '00' ? (
        <p className="text-primary font-semibold">
          Enviar otro código en {timer}
        </p>
      ) : (
        <>
          {!loading ? (
            <button
              type="button"
              onClick={() => {
                void resendCode();
              }}
            >
              <div className="cursor-pointer animate-scale">
                <p className="text-primary font-semibold hover:underline transition">
                  Reenviar código
                </p>
              </div>
            </button>
          ) : (
            <CircularProgress />
          )}
        </>
      )}
    </div>
  );
}
