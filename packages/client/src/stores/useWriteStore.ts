import produce from 'immer';
import { create } from 'zustand';

type States = {
  // write form
  title: string;
  body: string;
  thumbnail: string | null;
  tags: string[];

  // publish modal
  isPublishScreenOpen: boolean;
};

type Actions = {
  reset: () => void;

  // write form
  changeTitle: (title: string) => void;
  changeBody: (body: string) => void;
  changeThumbnail: (thumbnail: string | null) => void;
  changeTags: (tags: string[]) => void;

  // publish modal
  openPublishScreen: () => void;
  closePublishScreen: () => void;
};

const initialState: States = {
  title: '',
  body: '',
  thumbnail: null,
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
  changeThumbnail: (thumbnail) =>
    set(
      produce((draft) => {
        draft.thumbnail = thumbnail;
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
