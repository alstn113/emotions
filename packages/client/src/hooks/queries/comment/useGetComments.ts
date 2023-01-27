import CommentAPI from '~/api/comment';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const useGetComments = (options: UseQueryOptionsOf<typeof CommentAPI.getComments> = {}) => {
  return useQuery(getKey(), fetcher(), options);
};

const getKey = () => ['useGetComments'];
const fetcher = () => () => CommentAPI.getComments();

useGetComments.getKey = getKey;
useGetComments.fetcher = fetcher;

export default useGetComments;
