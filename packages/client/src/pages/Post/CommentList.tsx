import styled from '@emotion/styled';
import useGetComments from '~/hooks/queries/comment/useGetComments';

interface Props {
  postId: string;
}

const CommentList = ({ postId }: Props) => {
  const { data: comments } = useGetComments(postId, { suspense: true });
  return <div>CommentList</div>;
};

export default CommentList;
