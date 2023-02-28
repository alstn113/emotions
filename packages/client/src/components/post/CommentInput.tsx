// react
import { useState } from 'react';
import { extractError } from '~/lib/error';

// hooks
import { useQueryClient } from '@tanstack/react-query';
import { useCreateComment } from '~/hooks/queries/comment';
import { useGetCommentList } from '~/hooks/queries/post';
import useOpenLoginDialog from '~/hooks/useOpenLoginDialog';
import useUser from '~/hooks/useUser';

// components
import styled from '@emotion/styled';

interface Props {
  postId: string;
  commentsCount: number;
}

//TODO: mutation loading ui
const CommentInput = ({ postId, commentsCount }: Props) => {
  const [text, setText] = useState('');
  const queryClient = useQueryClient();
  const user = useUser();
  const openLoginDialog = useOpenLoginDialog();

  const { mutate } = useCreateComment({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetCommentList.getKey(postId));
    },
    onError: (e) => {
      const error = extractError(e);
      alert(error.message);
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!text) return;
    mutate({ postId, text });
    setText('');
  };

  const handleCommentInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!user) {
      openLoginDialog('comment');
      e.target.blur();
      return;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>{commentsCount.toLocaleString()} Comments</FormTitle>
      <Input
        type="text"
        placeholder="Write Comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={handleCommentInputFocus}
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
  margin: 0.5rem 0;
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
