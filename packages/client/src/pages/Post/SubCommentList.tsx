import styled from '@emotion/styled';
import { Comment } from '~/types';
import CommentItem from './CommentItem';

interface Props {
  subcomments: Comment[];
}

const SubCommentList = ({ subcomments }: Props) => {
  return (
    <Container>
      {subcomments.map((subcomment) => {
        return <CommentItem key={subcomment.id} isSubcomment comment={subcomment} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  padding-top: 1.5rem;
  padding-left: 1.5rem;
`;

export default SubCommentList;
