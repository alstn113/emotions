import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Comment } from '~/types';
import useLikeComment from './queries/comment/useLikeComment';
import useUnlikeComment from './queries/comment/useUnlikeComment';
import { useGetPostComments } from './queries/post';
import useOpenLoginDialog from './useOpenLoginDialog';
import useUser from './useUser';

interface Props {
  initialIsLiked: boolean;
  initialLikeCount: number;
  postId: string;
  commentId: string;
}

const useCommnetLikeManager = ({ initialIsLiked, initialLikeCount, postId, commentId }: Props) => {
  const queryClient = useQueryClient();
  const user = useUser();
  const openLoginDialog = useOpenLoginDialog();
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const { mutate: like } = useLikeComment();
  const { mutate: unlike } = useUnlikeComment();

  const toggleLike = () => {
    if (!user) return openLoginDialog('commentLike');

    if (!isLiked) {
      setLikeCount(likeCount + 1);
      setIsLiked(true);

      like(commentId, {
        onSuccess: (likes) => {
          setLikeCount(likes);
          queryClient.setQueryData<Comment[] | undefined>(
            useGetPostComments.getKey(postId),
            (oldData) =>
              oldData &&
              oldData.map((comment) => {
                if (comment.id === commentId) {
                  return {
                    ...comment,
                    likes,
                    isLiked: true,
                  };
                }
                return comment;
              }),
          );
        },
      });
    } else {
      setLikeCount(likeCount - 1);
      setIsLiked(false);

      unlike(commentId, {
        onSuccess: (likes) => {
          setLikeCount(likes);
          queryClient.setQueryData<Comment[] | undefined>(
            useGetPostComments.getKey(postId),
            (oldData) =>
              oldData &&
              oldData.map((comment) => {
                if (comment.id === commentId) {
                  return {
                    ...comment,
                    likes,
                    isLiked: false,
                  };
                }
                return comment;
              }),
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

export default useCommnetLikeManager;
