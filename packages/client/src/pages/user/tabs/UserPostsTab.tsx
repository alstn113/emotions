import styled from '@emotion/styled';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import PostListErrorFallback from '~/components/home/PostListErrorFallback';
import UserPostsContents from '~/components/user/UserPostsContents';

const UserPostsTab = () => {
  const { username } = useParams() as { username: string };
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <PostListErrorFallback
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Container>
            <UserPostsContents username={username} />
          </Container>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

const Container = styled.div`
  padding: 16px;
`;

export default UserPostsTab;
