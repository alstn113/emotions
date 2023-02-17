import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useCreatePost, useGetPosts } from '~/hooks/queries/post';
import { extractError } from '~/lib/error';
import useWriteStore from '~/stores/useWriteStore';
import { Button } from '../../common';
import PublishEditSeries from './PublishEditSeries';
import PublishSeriesSetting from './PublishSeriesSetting';
import PublishURLSetting from './PublishURLSetting';
import removeMarkdown from 'remove-markdown';

const PublishSettings = () => {
  const {
    title,
    body,
    thumbnail,
    tags,
    description,
    slug,
    series,
    editSeries,
    closePublishScreen,
  } = useWriteStore();
  const { mutate } = useCreatePost();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleCreatePost = () => {
    if (!title || !body) return alert('제목과 내용을 입력해주세요');
    const descriptionWithoutMd = removeMarkdown(description);
    mutate(
      {
        title,
        body,
        thumbnail,
        tags,
        description: descriptionWithoutMd,
        slug,
        seriesId: series?.id,
      },
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
      {editSeries ? (
        <PublishEditSeries />
      ) : (
        <>
          <SettingsWrapper>
            <PublishURLSetting />
            <PublishSeriesSetting />
          </SettingsWrapper>
          <ButtonsWrapper>
            <Button color="error" shadow onClick={closePublishScreen}>
              Cancel
            </Button>
            <Button color="success" shadow onClick={handleCreatePost}>
              Publish
            </Button>
          </ButtonsWrapper>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  gap: 1rem;
`;

const SettingsWrapper = styled.div`
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 1rem;
`;

export default PublishSettings;
