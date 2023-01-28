// hooks
import { useGetPosts } from '~/hooks/queries/post';

// components
import styled from '@emotion/styled';
import TabLayout from '~/components/layouts/TabLayout';
import PostList from './PostList';
import AsyncBoundary from '~/components/base/AsyncBoundary';
import ErrorFallback from '~/components/base/ErrorFallback';
import { MESSAGE } from '~/constants';

const Post = () => {
  return (
    <TabLayout>
      <Container>
        <AsyncBoundary
          rejectedFallback={
            <ErrorFallback message={MESSAGE.ERROR.LOAD_DATA} queryKey={useGetPosts.getKey()} />
          }
        >
          <PostList />
        </AsyncBoundary>
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  padding: 16px;
`;

export default Post;
