import { useCallback, useState } from 'react';
import useLikePost from './queries/post/useLikePost';
import useUnlikePost from './queries/post/useUnlikePost';

interface Props {
  initialIsLiked: boolean;
  initialLikeCount: number;
  postId: string;
}

const usePostLikeManager = ({ initialIsLiked, initialLikeCount, postId }: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const { mutate: like } = useLikePost();
  const { mutate: unlike } = useUnlikePost();

  const toggleLike = () => {
    if (!isLiked) {
      setLikeCount(likeCount + 1);
      setIsLiked(true);

      like(postId, {
        onSuccess: ({ likes }) => {
          setLikeCount(likes);
        },
      });
    } else {
      setLikeCount(likeCount - 1);
      setIsLiked(false);

      unlike(postId, {
        onSuccess: ({ likes }) => {
          setLikeCount(likes);
        },
      });
    }
  };

  return { isLiked, likeCount, toggleLike };
};

export default usePostLikeManager;
