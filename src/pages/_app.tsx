import { useState } from 'react';
import type { AppProps } from 'next/app';
import MyThemeProvider from '~/styles/MyThemeProvider';

// react-query
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // -- react-query default config --
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
      {process.env.NODE_ENV !== 'production' ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
      <MyThemeProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </MyThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
