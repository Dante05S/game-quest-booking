import '@/styles/globals.css';
import { Kanit } from 'next/font/google';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import clsx from 'clsx';
import { useEffect } from 'react';
import AuthService from '@/services/AuthService';
import { responseIsOk } from '@/helpers/request';
import { setToken, setUser } from '@/redux/slices/userSlice';

const kanit = Kanit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: 'normal',
  subsets: ['latin'],
  display: 'swap'
});

export default function App({
  Component,
  pageProps
}: AppProps): React.JSX.Element {
  const getCookieToken = async (): Promise<string | null> => {
    const authService = new AuthService();
    const response = await authService.getCookieToken();
    if (!responseIsOk(response.success, response.data)) {
      return null;
    }
    return response.data;
  };

  const refresh = async (): Promise<void> => {
    const token = await getCookieToken();
    const authService = new AuthService();
    const response = await authService.refresh(token ?? '');
    if (!responseIsOk(response.success, response.data)) {
      store.dispatch(setToken(null));
      store.dispatch(setUser(null));
      return;
    }
    const data = response.data!;
    store.dispatch(setToken(data.token));
    store.dispatch(setUser(data.user));
  };

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <Provider store={store}>
      <div className={clsx(kanit.className, 'h-full')}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
