import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useCreatePost, useGetPosts } from '~/hooks/queries/post';
import { extractError } from '~/lib/error';
import useWriteStore from '~/stores/useWriteStore';
import { Button } from '../../common';
import PublishSeriesSetting from './PublishSeriesSetting';
import PublishURLSetting from './PublishURLSetting';

const PublishSettings = () => {
  const { title, slug, body, thumbnail, tags, closePublishScreen, changeSlug } =
    useWriteStore();
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
      <SettingsWrapper>
        <PublishURLSetting />
        <PublishSeriesSetting />
      </SettingsWrapper>
      <ButtonWrapper>
        <Button color="success" shadow onClick={handleCreatePost}>
          Publish
        </Button>
        <Button color="error" shadow onClick={closePublishScreen}>
          Cancel
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
  height: 100%;
  justify-content: space-between;
`;

const SettingsWrapper = styled.div`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 1rem;
`;

export default PublishSettings;
