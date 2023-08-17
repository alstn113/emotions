import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import BottomSheetProvider from '~/components/base/BottomSheetProvider';
import ModalProvider from '~/components/base/ModalProvider';

import { lightTheme } from '~/lib/styles/themes';

import { GlobalStyle } from '~/GlobalStyle';

import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
      // -- react-query default config --
      retry: 1,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      // refetchOnWindowFocus: false,
      // refetchInterval: false,
      // staleTime: 1000 * 60 * 3, // 3m
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <App />
        <ModalProvider />
        <BottomSheetProvider />
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
