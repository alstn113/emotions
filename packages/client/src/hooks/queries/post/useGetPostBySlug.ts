import PostAPI from '~/lib/api/post';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const useGetPostBySlug = (
  username: string,
  slug: string,
  options: UseQueryOptionsOf<typeof PostAPI.getPostBySlug> = {},
) => {
  return useQuery(getKey(username, slug), fetcher(username, slug), options);
};

const getKey = (username: string, slug: string) => [
  'useGetPostBySlug',
  username,
  slug,
];
const fetcher = (username: string, slug: string) => async () =>
  await PostAPI.getPostBySlug(username, slug);

useGetPostBySlug.getKey = getKey;
useGetPostBySlug.fetcher = fetcher;

export default useGetPostBySlug;
