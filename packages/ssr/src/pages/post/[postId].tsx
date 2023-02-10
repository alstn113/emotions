// react
import { extractError } from '~/lib/error';

// hooks
import {
  useDeletePost,
  useGetPost,
  useGetPostComments,
} from '~/hooks/queries/post';
import useUser from '~/hooks/useUser';

// stores
import useBottomSheetStore from '~/stores/useBottomSheetStore';
import useModalStore from '~/stores/useModalStore';

// components
import styled from '@emotion/styled';
import { mediaQuery } from '~/lib/styles';
import { MenuDots, Pencil, Trash } from '~/components/vectors';
import BaseLayout from '~/components/layouts/BaseLayout';
import PostContents from '~/components/post/PostContents';
import CommentList from '~/components/post/CommentList';
import CommentInput from '~/components/post//CommentInput';
import { useRouter } from 'next/router';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';

export default function Post({ postId }: { postId: string }) {
  const router = useRouter();
  const { data: post } = useGetPost(postId);
  const { openModal } = useModalStore();
  const { openBottomSheet } = useBottomSheetStore();
  const user = useUser();
  const isMyPost = user?.id === post?.user.id;
  const { mutate: deletePost } = useDeletePost();

  const handleDelete = async () => {
    deletePost(postId, {
      onSuccess: () => {
        router.push('/');
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
        <PostContents postId={postId} />
        <CommentInput postId={postId} />
        <CommentList postId={postId} />
      </Container>
    </BaseLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
    postId: string;
  }>
> => {
  const queryClient = new QueryClient();
  const postId = params?.postId as string;

  try {
    await Promise.all([
      queryClient.fetchQuery(
        useGetPost.getKey(postId),
        useGetPost.fetcher(postId),
      ),
      queryClient.fetchQuery(
        useGetPostComments.getKey(postId),
        useGetPostComments.fetcher(postId),
      ),
    ]);

    return {
      props: { dehydratedState: dehydrate(queryClient), postId },
    };
  } catch (e) {
    const error = extractError(e);
    if (error.name === 'NotFound')
      return {
        notFound: true,
      };
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
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
