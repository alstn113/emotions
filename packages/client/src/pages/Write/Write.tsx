import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useCreatePost, useGetPosts } from '~/hooks/queries/post';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TabLayout from '~/components/layouts/TabLayout';
import { Button, TextInput } from '~/components/common';
import styled from '@emotion/styled';

interface IFormInput {
  title: string;
  body: string;
}

const schema = yup.object().shape({
  title: yup.string().required('필수항목입니다'),
  body: yup.string().required('필수 항목입니다'),
});

const Write = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useCreatePost({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetPosts.getKey());
      navigate('/');
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const onSubmit = ({ title, body }: IFormInput) => {
    mutate({ title, body });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  return (
    <TabLayout>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            {...register('title')}
            type="text"
            color="secondary"
            placeholder="TITLE"
            variant="underlined"
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <TextInput
            {...register('body')}
            type="text"
            color="secondary"
            placeholder="BODY"
            variant="underlined"
          />
          <ErrorMessage>{errors.body?.message}</ErrorMessage>
          <Button size="auto" shadow type="submit">
            POST
          </Button>
        </Form>
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 250px;
  button {
    margin-top: 1rem;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

export default Write;
