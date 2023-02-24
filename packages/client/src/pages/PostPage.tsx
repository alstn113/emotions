// react
import { useParams } from 'react-router-dom';

// components
import ErrorFallback from '~/components/base/ErrorFallback';
import PostContents from '~/components/post/PostContents';
import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import PostPageSkeleton from '~/components/post/PostPageSkeleton';

const PostPage = () => {
  const { username, slug } = useParams() as { username: string; slug: string };

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
          <Suspense fallback={<PostPageSkeleton />}>
            <PostContents usename={username} slug={slug} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default PostPage;
