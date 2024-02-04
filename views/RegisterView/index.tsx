import PageLayout from '@/layouts/PageLayout';
import Link from 'next/link';
import React from 'react';
import FormRegister from './FormRegister';
import AlertControl from '@/components/Display/Modal/AlertControl';

export default function RegisterView(): React.JSX.Element {
  return (
    <PageLayout isAuth>
      <div className="flex flex-col gap-4 items-center h-full">
        <h1 className="text-3xl font-semibold text-center">
          Registrate Gratis💜
        </h1>
        <p className="text-sm">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login">
            <span className="text-primary hover:underline">Inicia sesión</span>
          </Link>
        </p>
        <AlertControl>
          <FormRegister />
        </AlertControl>
      </div>
    </PageLayout>
  );
}
