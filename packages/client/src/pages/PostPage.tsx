// react
import { useParams } from 'react-router-dom';

// components
import ErrorFallback from '~/components/base/ErrorFallback';
import PostContents from '~/components/post/PostContents';
import { Suspense, useEffect } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import PostPageSkeleton from '~/components/post/PostPageSkeleton';

const PostPage = () => {
  const { username, slug } = useParams() as { username: string; slug: string };

  // 새로운 포스트를 불러올 때마다 스크롤을 맨 위로 올려준다.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [username, slug]);

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
            <PostContents username={username} slug={slug} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default PostPage;
