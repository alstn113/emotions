import styled from '@emotion/styled';
import { Button } from '~/components/common';
import { useGetPost } from '~/hooks/queries/post';
import usePostLikeManager from '~/hooks/usePostLikeManager';
import useUser from '~/hooks/useUser';

interface Props {
  postId: string;
}

const PostContents = ({ postId }: Props) => {
  const { data: post } = useGetPost(postId, { suspense: true });
  const user = useUser();

  const { isLiked, likeCount, toggleLike } = usePostLikeManager({
    initialIsLiked: post?.isLiked!,
    initialLikeCount: post?.postStats.likes!,
    postId,
  });

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
      <Author>Authored by {post?.user.username}</Author>
      {user && (
        <Button shadow size="sm" onClick={toggleLike}>
          {isLiked ? 'Unlike' : 'Like'} {likeCount}
        </Button>
      )}
    </>
  );
};

const Title = styled.div`
  font-size: 1.2rem;
`;

const Body = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
`;

const Author = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.7rem;
  font-weight: 500;
`;

export default PostContents;
