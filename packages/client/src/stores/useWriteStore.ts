import produce from 'immer';
import { create } from 'zustand';

type States = {
  // write form
  title: string;
  slug: string | null;
  body: string;
  description: string | null;
  thumbnail: string | null;
  tags: string[];

  // publish modal
  isPublishScreenOpen: boolean;
};

type Actions = {
  reset: () => void;

  // write form
  changeTitle: (title: string) => void;
  changeSlug: (slug: string | null) => void;
  changeBody: (body: string) => void;
  changeDescription: (description: string | null) => void;
  changeThumbnail: (thumbnail: string | null) => void;
  changeTags: (tags: string[]) => void;

  // publish modal
  openPublishScreen: () => void;
  closePublishScreen: () => void;
};

const initialState: States = {
  title: '',
  slug: null,
  body: '',
  description: null,
  thumbnail: null,
  tags: [],
  isPublishScreenOpen: false,
};

const useWriteStore = create<States & Actions>((set) => ({
  ...initialState,

  reset: () => set(initialState),

  // write form
  changeTitle: (title) =>
    set(
      produce((draft) => {
        draft.title = title;
      }),
    ),
  changeSlug: (slug) =>
    set(
      produce((draft) => {
        draft.slug = slug;
      }),
    ),
  changeBody: (body) =>
    set(
      produce((draft) => {
        draft.body = body;
      }),
    ),
  changeDescription: (description) =>
    set(
      produce((draft) => {
        draft.description = description;
      }),
    ),
  changeThumbnail: (thumbnail) =>
    set(
      produce((draft) => {
        draft.thumbnail = thumbnail;
      }),
    ),
  changeTags: (tags) =>
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
