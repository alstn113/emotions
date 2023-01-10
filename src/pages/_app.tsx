import type { AppProps } from 'next/app';
import MyThemeProvider from '~/styles/MyThemeProvider';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MyThemeProvider>
      <Component {...pageProps} />
    </MyThemeProvider>
  );
};

export default App;
