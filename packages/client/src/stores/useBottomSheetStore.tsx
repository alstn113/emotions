import produce from 'immer';
import { create } from 'zustand';

interface item {
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
}

type States = {
  visible: boolean;
  items: item[];
};

type Actions = {
  open: (items: item[]) => void;
  onCancel: () => void;
};

const useBottomSheetStore = create<States & Actions>((set) => ({
  visible: false,
  items: [],
  open: (items) =>
    set(
      produce((draft: States) => {
        draft.visible = true;
        draft.items = items;
      }),
    ),
  onCancel: () =>
    set(
      produce((draft: States) => {
        draft.visible = false;
      }),
    ),
}));

export default useBottomSheetStore;
