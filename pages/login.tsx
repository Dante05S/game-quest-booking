import PageProvider from '@/context/PageContext/PageProvider';
import React from 'react';
import LoginView from '@/views/LoginView';

export default function login(): React.JSX.Element {
  return (
    <PageProvider description="Iniciar sesión" props={null}>
      <LoginView />
    </PageProvider>
  );
}
