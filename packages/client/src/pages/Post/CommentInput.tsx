import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import PostAPI from '~/api/post';
import useCreateComment from '~/hooks/queries/comment/useCreateComment';
import useGetComments from '~/hooks/queries/comment/useGetComments';

interface Props {
  postId: string;
}

interface FormInput {
  text: string;
}

const CommentInput = ({ postId }: Props) => {
  const [text, setText] = useState('');
  const queryClient = useQueryClient();

  const { mutate } = useCreateComment({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetComments.getKey(postId));
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
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  border: 1px solid #cccccc;
  width: 100%;
  height: 45px;
  border-radius: 8px;
`;

export default CommentInput;
