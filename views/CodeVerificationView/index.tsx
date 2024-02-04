import PageLayout from '@/layouts/PageLayout';
import Image from 'next/image';
import React from 'react';

import usePage from '@/hooks/usePage';
import { type CodeVerificationProps } from '@/interfaces/pages/code_verification_props.interface';
import FormCodeVerification from './FormCodeVerification';
import AlertControl from '@/components/Display/Modal/AlertControl';

export default function CodeVerificationView(): React.JSX.Element {
  const { props } = usePage<CodeVerificationProps>();

  return (
    <PageLayout isAuth>
      <div className="flex items-center justify-center h-full w-full py-6">
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
          <div className="flex flex-col items-center gap-4 mb-3">
            <h1 className="text-3xl font-semibold text-center">
              Verifica tu correo electronico💜
            </h1>
            <p className="text-base font-semibold text-center">
              Verifica el codigo que se te envio a tu correo electronico para
              completar el inicio de sesión
            </p>
          </div>
          <Image
            src="/mobile-app.svg"
            alt="mobile verification code"
            width={300}
            height={300}
          />
          <div className="flex flex-col items-center gap-4 mt-3">
            <p className="text-base font-semibold text-center">
              Hola <span className="text-primary">{props.name}</span>, se ha
              enviado un mensaje al correo electronico{' '}
              <span className="text-primary whitespace-nowrap">
                {props.email}
              </span>{' '}
              con un código para verificar tu cuenta.
            </p>
            <AlertControl>
              <FormCodeVerification />
            </AlertControl>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
