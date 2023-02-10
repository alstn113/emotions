// react
import { useNavigate } from 'react-router-dom';
import { extractError } from '~/lib/error';

// hooks
import usePostLikeManager from '~/hooks/usePostLikeManager';
import useUser from '~/hooks/useUser';
import { useDeletePost, useGetPost } from '~/hooks/queries/post';

// stores
import useModalStore from '~/stores/useModalStore';

// components
import styled from '@emotion/styled';
import LikeButton from '~/components/base/LikeButton';
import { Button } from '~/components/common';
import { mediaQuery } from '~/lib/styles';
import PostSeriesViewer from './PostSeriesViewer';

interface Props {
  postId: string;
}

const PostContents = ({ postId }: Props) => {
  const { data: post } = useGetPost(postId, { suspense: true });
  const user = useUser();
  const isMyPost = user?.id === post?.user.id;
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { isLiked, likeCount, toggleLike } = usePostLikeManager({
    initialIsLiked: post?.isLiked!,
    initialLikeCount: post?.postStats.likes!,
    postId,
  });

  const { mutate: deletePost } = useDeletePost();

  const handleDeletePost = () => {
    openModal({
      title: '게시글 삭제',
      message: '정말로 게시글을 삭제하시겠습니까?',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => {
        deletePost(postId, {
          onSuccess: () => {
            navigate('/');
          },
          onError: (e) => {
            const error = extractError(e);
            alert(error.message);
          },
        });
      },
    });
  };

  return (
    <>
      <Title>{post?.title}</Title>
      <TagList>
        {post?.tags.map((tag) => {
          return <div key={tag}>{tag}</div>;
        })}
      </TagList>
      {post?.series && <PostSeriesViewer series={post?.series} />}
      {post?.thumbnail && <Thumbnail src={post?.thumbnail} />}
      <Body>
        <pre>{post?.body}</pre>
      </Body>
      <Group>
        <Author>Authored by {post?.user.username}</Author>
        {isMyPost ? (
          <ButtonsWrapper>
            <Button shadow color="warning" size="sm">
              수정
            </Button>
            <Button shadow color="error" size="sm" onClick={handleDeletePost}>
              삭제
            </Button>
          </ButtonsWrapper>
        ) : (
          <></>
        )}
      </Group>
      <LikeButtonWrapper>
        <LikeButton size="md" isLiked={isLiked} onClick={toggleLike} />
        <span>좋아요 {likeCount.toLocaleString()}개</span>
      </LikeButtonWrapper>
    </>
  );
};

const Title = styled.div`
  font-size: 2rem;
  line-height: 1.5;
  font-weight: 900;
`;

const TagList = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
    border-radius: 0.8rem;
    background: linear-gradient(to right bottom, #f6d365, #ffc9ba);
    color: #000;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`;

const Body = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;

  pre {
    white-space: pre-wrap;
  }
`;

const Author = styled.div`
  display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  color: #999;
`;
const Group = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const ButtonsWrapper = styled.div`
  display: none;
  gap: 0.5rem;

  ${mediaQuery.mobile} {
    display: flex;
  }
`;

const LikeButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span {
    color: #999;
    font-size: 0.8rem;
  }
  margin-bottom: 1rem;
`;

export default PostContents;
