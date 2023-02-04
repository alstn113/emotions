import { useCallback } from 'react';
import useModalStore from '~/stores/useModalStore';
import Modal from '~/components/common/Modal/Modal';

const ModalProvider = () => {
  const { config, closeModal, visible } = useModalStore();

  const onCancel = useCallback(() => {
    config?.onCancel?.();
    closeModal();
  }, [config, closeModal]);

  const onConfirm = useCallback(() => {
    config?.onConfirm();
    closeModal();
  }, [config, closeModal]);

  return (
    <Modal
      title={config?.title || ''}
      message={config?.message || ''}
      cancelText={config?.cancelText}
      confirmText={config?.confirmText}
      visible={visible}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default ModalProvider;
