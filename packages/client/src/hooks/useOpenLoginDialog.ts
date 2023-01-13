import useModalStore from '~/libs/stores/useModalStore';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useOpenLoginDialog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { open } = useModalStore();
  const openLoginDialog = useCallback(
    () =>
      open({
        title: '로그인 후 이용해주세요.',
        message: '로그인이 필요합니다.',
        confirmText: '로그인',
        cancelText: '취소',
        onConfirm: () => navigate(`/login?next=${location.pathname}`),
      }),
    [open, navigate, location],
  );

  return openLoginDialog;
};

export default useOpenLoginDialog;
