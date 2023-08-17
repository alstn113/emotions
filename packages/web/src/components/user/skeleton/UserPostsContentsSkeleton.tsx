import styled from '@emotion/styled';

import PostCardSkeleton from '../../home/skeleton/PostCardSkeleton';

const UserPostsContentsSkeleton = () => {
  return (
    <Container>
      {[1, 2, 3, 4]?.map((number) => {
        return <PostCardSkeleton key={number} />;
      })}
    </Container>
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

export default UserPostsContentsSkeleton;
