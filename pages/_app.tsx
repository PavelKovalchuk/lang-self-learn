import type { AppProps } from 'next/app';
import Head from 'next/head';
import SSRProvider from 'react-bootstrap/SSRProvider';

import 'styles/globals.scss';

/* eslint-disable react/jsx-props-no-spreading */

export default function App({ Component, pageProps }: AppProps) {
  /*  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []); */

  return (
    <SSRProvider>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </SSRProvider>
  );
}
