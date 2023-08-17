import { produce } from 'immer';
import { create } from 'zustand';

interface ModalConfig {
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm: () => void;
}

type States = {
  visible: boolean;
  config: ModalConfig | null;
};

type Actions = {
  closeModal: () => void;
  openModal: (config: ModalConfig) => void;
};

const useModalStore = create<States & Actions>((set) => ({
  visible: false,
  config: null,
  closeModal: () =>
    set(
      produce((draft: States) => {
        draft.visible = false;
      }),
    ),
  openModal: (config) =>
    set(
      produce((draft: States) => {
        draft.visible = true;
        draft.config = config;
      }),
    ),
}));

export default useModalStore;
