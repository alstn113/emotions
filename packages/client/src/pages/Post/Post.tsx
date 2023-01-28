import { useParams } from 'react-router-dom';
import BaseLayout from '~/components/layouts/BaseLayout';
import { useGetPost } from '~/hooks/queries/post';

const Post = () => {
  const { postId } = useParams() as { postId: string };
  const { data: post } = useGetPost(postId);

  return <BaseLayout>{post?.title}</BaseLayout>;
};

export default Post;
