import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { MenuDots, Pencil, Trash } from '~/components/vectors';
import { useDeletePost, useGetPostBySlug } from '~/hooks/queries/post';
import useUser from '~/hooks/useUser';
import { extractError } from '~/lib/error';
import useBottomSheetStore from '~/stores/useBottomSheetStore';
import useModalStore from '~/stores/useModalStore';

interface Props {
  slug: string;
}

const MoreVertPending = ({ slug }: Props) => {
  const { data: post } = useGetPostBySlug(slug, {
    suspense: true,
  });
  const user = useUser();
  const isMyPost = user?.id === post?.user.id;

  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { openBottomSheet } = useBottomSheetStore();
  const { mutate: deletePost } = useDeletePost();

  const handleDelete = async () => {
    deletePost(post?.id!, {
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

  return isMyPost ? (
    <MoreButton onClick={onClickMore}>
      <MenuDots />
    </MoreButton>
  ) : null;
};

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

export default MoreVertPending;
