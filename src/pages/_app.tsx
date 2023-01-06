import type { AppProps } from 'next/app';
import MyThemeProvider from '~/styles/MyThemeProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MyThemeProvider>
      <Component {...pageProps} />
    </MyThemeProvider>
  );
}
