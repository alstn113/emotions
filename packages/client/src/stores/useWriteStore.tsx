import produce from 'immer';
import { create } from 'zustand';

type States = {
  // write form
  title: string;
  body: string;
  tags: string[];

  // publish modal
  isPublishScreenOpen: boolean;
};

type Actions = {
  reset: () => void;

  // write form
  changeTitle: (title: string) => void;
  changeBody: (body: string) => void;
  changeTags: (tags: string[]) => void;

  // publish modal
  openPublishScreen: () => void;
  closePublishScreen: () => void;
};

const initialState: States = {
  title: '',
  body: '',
  tags: [],
  isPublishScreenOpen: false,
};

const useWriteStore = create<States & Actions>((set) => ({
  ...initialState,

  reset: () => set(initialState),

  // write form
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
  changeTags: (tags: string[]) =>
    set(
      produce((draft) => {
        draft.tags = tags;
      }),
    ),

  // publish modal
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
