import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import SSRProvider from 'react-bootstrap/SSRProvider';

import 'styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  /*  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []); */

  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}
