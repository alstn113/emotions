import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useCreatePost, useGetPosts } from '~/hooks/queries/post';
import { extractError } from '~/lib/error';
import useWriteStore from '~/stores/useWriteStore';
import { Button } from '../common';

const PublishSettings = () => {
  const {
    title,
    slug,
    body,
    description,
    thumbnail,
    tags,
    closePublishScreen,
    changeSlug,
    changeDescription,
  } = useWriteStore();
  const { mutate } = useCreatePost();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleCreatePost = () => {
    if (!title || !body) return alert('제목과 내용을 입력해주세요');
    mutate(
      { title, body, thumbnail, tags },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries(useGetPosts.getKey());
          navigate('/');
        },
        onError: (e) => {
          const error = extractError(e);
          alert(error.message);
        },
      },
    );
  };

  return (
    <Container>
      <ButtonWrapper>
        <Button color="success" size="auto" shadow onClick={handleCreatePost}>
          등록
        </Button>
        <Button color="error" size="auto" shadow onClick={closePublishScreen}>
          닫기
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;

export default PublishSettings;
