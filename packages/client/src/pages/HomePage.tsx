// hooks
import { useGetPosts } from '~/hooks/queries/post';

// components
import styled from '@emotion/styled';
import AsyncBoundary from '~/components/base/AsyncBoundary';
import ErrorFallback from '~/components/base/ErrorFallback';
import { MESSAGE } from '~/constants';
import { mediaQuery } from '~/lib/styles';
import TabLayout from '~/components/layouts/TabLayout';
import PostList from '~/components/home/PostList';
import PostListSkeleton from '~/components/home/skeleton/PostListSkeleton';

const HomePage = () => {
  return (
    <TabLayout>
      <Container>
        <AsyncBoundary
          rejectedFallback={
            <ErrorFallback
              message={MESSAGE.ERROR.LOAD_DATA}
              queryKey={useGetPosts.getKey()}
            />
          }
          pendingFallback={<PostListSkeleton />}
        >
          <div
            style={{ fontSize: '4rem', textAlign: 'center', margin: '20px' }}
          >
            공사 중!!!!!
          </div>
          <PostList />
        </AsyncBoundary>
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  padding: 16px;
  ${mediaQuery.desktop} {
    width: 1200px;
    margin: 0 auto;
  }
`;

export default HomePage;
