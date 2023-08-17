import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import ErrorFallback from '~/components/base/ErrorFallback';
import Loading from '~/components/base/Loading';

import { useGetMe } from '~/hooks/queries/user';

import PageRoutes from './routes';
import '../src/lib/styles/fonts.css';

const App = () => {
  useGetMe();

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorFallback
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Suspense fallback={<Loading />}>
            <PageRoutes />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default App;
