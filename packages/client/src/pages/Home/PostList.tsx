// hooks
import { useGetPosts } from '~/hooks/queries/post';

// components
import styled from '@emotion/styled';
import { mediaQuery } from '~/styles';
import PostCard from './PostCard';

const PostList = () => {
  const { data: posts, hasNextPage, fetchNextPage, isFetching } = useGetPosts();
  return (
    <Container>
      {posts?.pages.map((page) =>
        page.list.map((post) => <PostCard key={post.id} post={post} />),
      )}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  ${mediaQuery.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${mediaQuery.desktop} {
    grid-template-columns: repeat(3, 1fr);
    margin-left: auto;
    margin-right: auto;
  }
  gap: 24px;
`;

export default PostList;
