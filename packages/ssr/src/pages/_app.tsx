import type { AppContext, AppProps } from 'next/app';
import { useState } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyle } from '~/GlobalStyle';
import { lightTheme } from '~/lib/styles';
import ModalProvider from '~/components/base/ModalProvider';
import BottomSheetProvider from '~/components/base/BottomSheetProvider';
import { setClientCookie } from '~/lib/api/apiClient';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            refetchInterval: false,
            staleTime: 1000 * 60 * 3, // 3m
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <Component {...pageProps} />
          <ModalProvider />
          <BottomSheetProvider />
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

App.getInitialProps = async (context: AppContext) => {
  const { ctx, Component } = context; // next에서 넣어주는 context
  let pageProps = {};
  const cookie = ctx.req ? ctx.req.headers.cookie : '';
  setClientCookie('');
  if (ctx.req && cookie) {
    setClientCookie(cookie);
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps = {
    pageProps,
  };

  return { pageProps };
};
