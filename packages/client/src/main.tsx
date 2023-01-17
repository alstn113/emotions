// react
import ReactDOM from 'react-dom/client';
import App from './App';

// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// provider
import MyThemeProvider from './styles/MyThemeProvider';
import ModalProvider from './components/ModalProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
      // -- react-query default config --
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      staleTime: 1000 * 60 * 3, // 3m
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    <MyThemeProvider>
      <ModalProvider />
      <App />
    </MyThemeProvider>
  </QueryClientProvider>,
);
