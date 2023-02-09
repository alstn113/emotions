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
  openBottomSheet: (items: item[]) => void;
  closeBottomSheet: () => void;
};

const useBottomSheetStore = create<States & Actions>((set) => ({
  visible: false,
  items: [],
  openBottomSheet: (items) =>
    set(
      produce((draft: States) => {
        draft.visible = true;
        draft.items = items;
      }),
    ),
  closeBottomSheet: () =>
    set(
      produce((draft: States) => {
        draft.visible = false;
      }),
    ),
}));

export default useBottomSheetStore;
