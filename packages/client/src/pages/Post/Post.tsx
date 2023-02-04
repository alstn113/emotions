import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import AsyncBoundary from '~/components/base/AsyncBoundary';
import ErrorFallback from '~/components/base/ErrorFallback';
import BaseLayout from '~/components/layouts/BaseLayout';
import { MESSAGE } from '~/constants';
import {
  useDeletePost,
  useGetPost,
  useGetPostComments,
} from '~/hooks/queries/post';
import CommentList from './CommentList';
import PostContents from './PostContents';
import CommentInput from './CommentInput';
import { mediaQuery } from '~/styles';
import useUser from '~/hooks/useUser';
import { MenuDots, Pencil, Trash } from '~/components/vectors';
import useBottomSheetStore from '~/stores/useBottomSheetStore';
import useModalStore from '~/stores/useModalStore';

const Post = () => {
  const { postId } = useParams() as { postId: string };
  const { data: post } = useGetPost(postId);
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { openBottomSheet } = useBottomSheetStore();
  const user = useUser();
  const isMyPost = user?.id === post?.user.id;
  const { mutate: deletePost } = useDeletePost();

  const handleDelete = async () => {
    deletePost(postId, {
      onSuccess: () => {
        //TODO: update query cache
        navigate('/');
      },
      onError: (e) => {
        console.log(e);
      },
    });
  };

  const onClickMore = () => {
    openBottomSheet([
      {
        icon: <Pencil />,
        name: '수정',
        onClick: () => {},
      },
      {
        icon: <Trash />,
        name: '삭제',
        onClick: () =>
          openModal({
            title: '포스트 삭제',
            message: '정말로 포스트을 삭제하시겠습니까?',
            confirmText: '확인',
            cancelText: '취소',
            onConfirm: handleDelete,
          }),
      },
    ]);
  };

  return (
    <BaseLayout
      headerRight={
        isMyPost && (
          <MoreButton onClick={onClickMore}>
            <MenuDots />
          </MoreButton>
        )
      }
    >
      <Container>
        <AsyncBoundary
          rejectedFallback={
            <ErrorFallback
              queryKey={useGetPost.getKey(postId)}
              message={MESSAGE.ERROR.LOAD_DATA}
            />
          }
        >
          <PostContents postId={postId} />
        </AsyncBoundary>
        <CommentInput postId={postId} />
        <AsyncBoundary
          rejectedFallback={
            <ErrorFallback
              queryKey={useGetPostComments.getKey(postId)}
              message={MESSAGE.ERROR.LOAD_DATA}
            />
          }
        >
          <CommentList postId={postId} />
        </AsyncBoundary>
      </Container>
    </BaseLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  gap: 1rem;
  ${mediaQuery.tablet} {
    width: 736px;
    margin: 4rem auto;
  }
`;

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: #fff;
  svg {
    width: 30px;
    height: 30px;
  }
`;

export default Post;
