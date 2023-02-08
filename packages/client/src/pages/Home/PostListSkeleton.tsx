// components
import styled from '@emotion/styled';
import { mediaQuery } from '~/lib/styles';
import PostCardSkeleton from './PostCardSkeleton';

const PostListSkeleton = () => {
  return (
    <Container>
      {[1, 2, 3, 4, 5, 6]?.map((number) => {
        return <PostCardSkeleton key={number}></PostCardSkeleton>;
      })}
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

export default PostListSkeleton;
