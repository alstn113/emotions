import styled from '@emotion/styled';
import { useGetPost } from '~/hooks/queries/post';

interface Props {
  postId: string;
}

const PostContents = ({ postId }: Props) => {
  const { data: post } = useGetPost(postId, { suspense: true });

  return (
    <>
      <Title>
        <div>Title</div>
        <div>{post?.title}</div>
      </Title>
      <Body>
        <div>Content</div>
        <div>{post?.body}</div>
      </Body>
      <Author>Authored by {post?.author.username}</Author>
    </>
  );
};

const Title = styled.div`
  font-size: 1.2rem;
`;

const Body = styled.div`
  font-size: 1rem;
`;

const Author = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.7rem;
  font-weight: 500;
`;

export default PostContents;
