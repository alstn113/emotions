// hooks
import { useGetPostsByUsername } from '~/hooks/queries/post';

// components
import styled from '@emotion/styled';
import PostCard from '../home/PostCard';
import useIntersectionObserver from '~/hooks/useIntersectionObserver';
import UserPostsContentsSkeleton from './skeleton/UserPostsContentsSkeleton';

interface Props {
  username: string;
}

const UserPostsContents = ({ username }: Props) => {
  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useGetPostsByUsername(username, {
    suspense: true,
  });

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const targetElement = useIntersectionObserver({ onIntersect: loadMore });

  return (
    <>
      <Container>
        {posts?.pages.map((page) =>
          page.list.map((post) => <PostCard key={post.id} post={post} />),
        )}
      </Container>
      {isFetching && <UserPostsContentsSkeleton />}
      <InfiniteScrollTarget ref={targetElement} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  gap: 1rem;
  width: 100%;
`;

const InfiniteScrollTarget = styled.div`
  visibility: hidden;
  width: 100%;
`;

export default UserPostsContents;
