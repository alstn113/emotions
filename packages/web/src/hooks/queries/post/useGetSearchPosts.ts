import { useQuery } from '@tanstack/react-query';

import type { UseQueryOptionsOf } from '~/hooks/queries/types';

import { PostAPI } from '~/lib/api';

const useGetSearchPosts = (
  keyword: string,
  options: UseQueryOptionsOf<typeof PostAPI.getSearchPosts> = {},
) => {
  return useQuery(getKey(keyword), fetcher(keyword), options);
};

const getKey = (keyword: string) => ['useGetSearchPosts', keyword];
const fetcher = (keyword: string) => () => PostAPI.getSearchPosts(keyword);

useGetSearchPosts.getKey = getKey;
useGetSearchPosts.fetcher = fetcher;

export default useGetSearchPosts;
