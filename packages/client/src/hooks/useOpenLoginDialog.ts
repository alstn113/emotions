import useModalStore from '~/stores/useModalStore';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const messageMap = {
  postLike: '게시글을 추천하기위해서는 로그인이 필요합니다.',
  commentLike: '댓글을 추천하기위해서는 로그인이 필요합니다.',
};

const useOpenLoginDialog = (type: keyof typeof messageMap) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { open } = useModalStore();
  const message = messageMap[type];
  const openLoginDialog = useCallback(
    () =>
      open({
        title: '로그인 후 이용해주세요.',
        message,
        confirmText: '로그인',
        cancelText: '취소',
        onConfirm: () => navigate(`/login?next=${location.pathname}`),
      }),
    [open, navigate, location],
  );

  return openLoginDialog;
};

export default useOpenLoginDialog;
