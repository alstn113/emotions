// react
import { useNavigate, useParams } from 'react-router-dom';
import { MESSAGE } from '~/constants';
import { extractError } from '~/lib/error';

// hooks
import {
  useDeletePost,
  useGetPost,
  useGetPostBySlug,
  useGetPostComments,
} from '~/hooks/queries/post';
import useUser from '~/hooks/useUser';

// stores
import useBottomSheetStore from '~/stores/useBottomSheetStore';
import useModalStore from '~/stores/useModalStore';

// components
import styled from '@emotion/styled';
import AsyncBoundary from '~/components/base/AsyncBoundary';
import ErrorFallback from '~/components/base/ErrorFallback';
import { mediaQuery } from '~/lib/styles';
import { MenuDots, Pencil, Trash } from '~/components/vectors';
import BaseLayout from '~/components/layouts/BaseLayout';
import PostContents from '~/components/post/PostContents';
import CommentList from '~/components/post/CommentList';
import CommentInput from '~/components/post//CommentInput';
import PostContentsSkeleton from '~/components/post/skeleton/PostContentsSkeleton';
import CommentListSkeleton from '~/components/post/skeleton/CommentListSkeleton';

const PostPage = () => {
  const { slug } = useParams() as { slug: string };
  const { data: post } = useGetPostBySlug(slug);
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { openBottomSheet } = useBottomSheetStore();
  const user = useUser();
  const isMyPost = user?.id === post?.user.id;
  const { mutate: deletePost } = useDeletePost();

  const handleDelete = async () => {
    deletePost(post?.id, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (e) => {
        const error = extractError(e);
        alert(error.message);
      },
    });
  };

  const onClickMore = () => {
    openBottomSheet([
      {
        icon: <Pencil />,
        name: '수정',
        onClick: () => {
          //TODO: 수정
        },
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
              queryKey={useGetPostBySlug.getKey(slug)}
              message={MESSAGE.ERROR.LOAD_DATA}
            />
          }
          pendingFallback={<PostContentsSkeleton />}
        >
          <PostContents slug={slug} />
        </AsyncBoundary>
        <CommentInput postId={post?.id} />
        <AsyncBoundary
          rejectedFallback={
            <ErrorFallback
              queryKey={useGetPostComments.getKey(post?.id)}
              message={MESSAGE.ERROR.LOAD_DATA}
            />
          }
          pendingFallback={<CommentListSkeleton />}
        >
          <CommentList postId={post?.id} />
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

export default PostPage;
