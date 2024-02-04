import '@/styles/globals.css';
import { Kanit } from 'next/font/google';
import type { AppProps } from 'next/app';

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
  return (
    <div className={kanit.className}>
      <Component {...pageProps} />
    </div>
  );
}
