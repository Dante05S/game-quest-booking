import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(): React.JSX.Element {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <link rel="icon" href="logo.png" type="image/x-icon" />
        <meta name="robots" content="index,follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="gamequestbooking" />
        <meta
          property="og:url"
          content="https://game-quest-booking.vercel.app/"
        />
      </Head>
      <body className="bg-background text-white">
        <Main />
        <div id="aside" />
        <div id="modal" />
        <NextScript />
      </body>
    </Html>
  );
}
