import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { PostStats, PostWithStats } from '~/lib/types';

import { useGetPost } from './queries/post';
import useLikePost from './queries/post/useLikePost';
import useUnlikePost from './queries/post/useUnlikePost';
import useOpenLoginDialog from './useOpenLoginDialog';
import useUser from './useUser';

interface Props {
  initialIsLiked: boolean;
  initialLikeCount: number;
  postId: string;
}

const usePostLikeManager = ({
  initialIsLiked,
  initialLikeCount,
  postId,
}: Props) => {
  const queryClient = useQueryClient();
  const user = useUser();
  const openLoginDialog = useOpenLoginDialog();
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const { mutate: like } = useLikePost();
  const { mutate: unlike } = useUnlikePost();

  const toggleLike = () => {
    if (!user) return openLoginDialog('postLike');

    if (!isLiked) {
      setLikeCount(likeCount + 1);
      setIsLiked(true);

      like(postId, {
        onSuccess: (postStats: PostStats) => {
          setLikeCount(postStats.likes);
          queryClient.setQueryData<PostWithStats | undefined>(
            useGetPost.getKey(postId),
            (oldData) =>
              oldData && {
                ...oldData,
                postStats,
                isLiked: true,
              },
          );
        },
      });
    } else {
      setLikeCount(likeCount - 1);
      setIsLiked(false);

      unlike(postId, {
        onSuccess: (postStats: PostStats) => {
          setLikeCount(postStats.likes);
          queryClient.setQueryData<PostWithStats | undefined>(
            useGetPost.getKey(postId),
            (oldData) =>
              oldData && {
                ...oldData,
                postStats,
                isLiked: false,
              },
          );
        },
      });
    }
  };

  useEffect(() => {
    setLikeCount(initialLikeCount);
  }, [initialLikeCount]);

  return { isLiked, likeCount, toggleLike };
};

export default usePostLikeManager;
