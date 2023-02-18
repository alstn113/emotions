import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import ErrorFallback from '~/components/base/ErrorFallback';
import BaseLayout from '~/components/layouts/BaseLayout';
import { ErrorBoundary } from 'react-error-boundary';
import UserLayoutPending from './UserLayoutPending';

const UserLayout = () => {
  const { username } = useParams() as { username: string };

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
          <Suspense fallback={<BaseLayout />}>
            <UserLayoutPending username={username} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default UserLayout;
