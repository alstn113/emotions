// react
import ReactDOM from 'react-dom/client';
import App from './App';

// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// provider
import ModalProvider from '~/components/base/ModalProvider';
import BottomSheetProvider from '~/components/base/BottomSheetProvider';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '~/lib/styles/themes';
import { GlobalStyle } from '~/GlobalStyle';
import ScrollToTop from './components/base/ScrollToTop';
import { BrowserRouter } from 'react-router-dom';

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
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
      <ModalProvider />
      <BottomSheetProvider />
    </ThemeProvider>
  </QueryClientProvider>,
);
