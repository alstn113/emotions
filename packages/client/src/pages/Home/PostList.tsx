// react
import { Link } from 'react-router-dom';

// hooks
import { useGetPosts } from '~/hooks/queries/post';

// components
import styled from '@emotion/styled';
import { glassmorphism, mediaQuery } from '~/styles';

const PostList = () => {
  const { data: posts } = useGetPosts({ suspense: true });

  return (
    <Container>
      {posts?.map((post) => {
        return (
          <PostCard key={post.id}>
            <Link to={`/post/${post.id}`}>
              <Title>{post.title}</Title>
              <Author>Authored By {post.author.username}</Author>
            </Link>
          </PostCard>
        );
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

const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  ${glassmorphism}
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;
`;

const Author = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.7rem;
`;

export default PostList;
