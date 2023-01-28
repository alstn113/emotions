import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '~/components/common';
import useCreateComment from '~/hooks/queries/comment/useCreateComment';
import useGetComments from '~/hooks/queries/comment/useGetComments';
import { Comment } from '~/types';

interface Props {
  parentcomment: Comment;
  onClose: () => void;
}

const ReplyComment = ({ parentcomment, onClose }: Props) => {
  const [text, setText] = useState('');
  const queryClient = useQueryClient();

  const { mutate } = useCreateComment({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetComments.getKey(parentcomment.postId));
      return;
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const handleSubmit = () => {
    if (!text) return;
    mutate({ postId: parentcomment.postId, text });
    onClose();
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="Write Comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <ButtonsWrapper>
        <Button shadow color="success" size="sm" onClick={handleSubmit}>
          Confirm
        </Button>
        <Button shadow color="error" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </ButtonsWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 2rem;
  padding-left: 2rem;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  border: 1px solid #cccccc;
  width: 100%;
  height: 45px;
  border-radius: 8px;
  &:focus {
    border: 1px solid #2c2c2c;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;
`;

export default ReplyComment;
