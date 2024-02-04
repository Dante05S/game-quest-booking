/* eslint-disable @typescript-eslint/require-await */
import PageProvider from '@/context/PageContext/PageProvider';
import { parse } from 'cookie';
import { responseIsOk } from '@/helpers/request';
import { type GetServerSidePropsContext, type GetServerSideProps } from 'next';
import React from 'react';
import UserService from '@/services/UserService';
import CodeVerificationView from '@/views/CodeVerificationView';

interface Props {
  email: string;
  name: string;
}

export default function CodeVerification({
  email,
  name
}: Props): React.JSX.Element {
  return (
    <PageProvider description="Verificación" props={{ email, name }}>
      <CodeVerificationView />
    </PageProvider>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  const cookies = parse(ctx.req.headers.cookie ?? '');
  const email = cookies.email;

  const userService = new UserService();
  const response = await userService.getById(email, true);
  if (!responseIsOk(response.success, response.data)) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }
  const name = `${response.data?.first_name ?? ''} ${
    response.data?.last_name ?? ''
  }`;

  return {
    props: {
      email,
      name
    }
  };
};
