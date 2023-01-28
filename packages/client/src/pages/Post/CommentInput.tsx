import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import useCreateComment from '~/hooks/queries/comment/useCreateComment';
import { useGetPostComments } from '~/hooks/queries/post';

interface Props {
  postId: string;
}

const CommentInput = ({ postId }: Props) => {
  const [text, setText] = useState('');
  const queryClient = useQueryClient();

  const { mutate } = useCreateComment({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetPostComments.getKey(postId));
      return;
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!text) return;
    mutate({ postId, text });
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Comments</FormTitle>
      <Input
        type="text"
        placeholder="Write Comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormTitle = styled.div`
  width: 100%;
  padding: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  justify-content: flex-start;
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

export default CommentInput;
