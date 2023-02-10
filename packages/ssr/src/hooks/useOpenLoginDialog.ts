import useModalStore from '~/stores/useModalStore';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

const messageMap = {
  postLike: '게시글을 추천하기위해서는 로그인이 필요합니다.',
  commentLike: '댓글을 추천하기위해서는 로그인이 필요합니다.',
  comment: '댓글을 작성하기위해서는 로그인이 필요합니다.',
  subcomment: '답글을 작성하기위해서는 로그인이 필요합니다.',
};

const useOpenLoginDialog = () => {
  const router = useRouter();
  const { openModal } = useModalStore();
  const openLoginDialog = useCallback(
    (type: keyof typeof messageMap) => {
      const message = messageMap[type];
      openModal({
        title: '로그인 후 이용해주세요.',
        message,
        confirmText: '로그인',
        cancelText: '취소',
        // use next query to redirect after login
        onConfirm: () => router.push(`/setting?next=${router.pathname}`),
      });
    },
    [openModal, router],
  );

  return openLoginDialog;
};

export default useOpenLoginDialog;
