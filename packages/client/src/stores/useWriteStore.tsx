import produce from 'immer';
import { create } from 'zustand';

type States = {
  // write form
  title: string;
  body: string;

  // publish modal
  isPublishScreenOpen: boolean;
};

type Actions = {
  // write form
  changeTitle: (title: string) => void;
  changeBody: (body: string) => void;

  // publish modal
  openPublishScreen: () => void;
  closePublishScreen: () => void;
};

const useWriteStore = create<States & Actions>((set) => ({
  // write form
  title: '',
  body: '',
  changeTitle: (title: string) =>
    set(
      produce((draft) => {
        draft.title = title;
      }),
    ),
  changeBody: (body: string) =>
    set(
      produce((draft) => {
        draft.body = body;
      }),
    ),

  // publish modal
  isPublishScreenOpen: false,
  openPublishScreen: () =>
    set(
      produce((draft) => {
        draft.isPublishScreenOpen = true;
      }),
    ),
  closePublishScreen: () =>
    set(
      produce((draft) => {
        draft.isPublishScreenOpen = false;
      }),
    ),
}));

export default useWriteStore;
