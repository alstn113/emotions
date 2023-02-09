import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/common';
import { extractError } from '~/lib/error';
import { useCreatePost, useGetPosts } from '~/hooks/queries/post';
import useWriteStore from '~/stores/useWriteStore';
import PublishPreview from './PublishPreview';

const PublishScreen = () => {
  const {
    title,
    body,
    thumbnail,
    tags,
    isPublishScreenOpen,
    closePublishScreen,
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
    <AnimatePresence initial={false}>
      {isPublishScreenOpen && (
        <Container
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ stiffness: 500, damping: 100, type: 'spring' }}
        >
          <Contents>
            <PublishPreview />
            <ButtonWrapper>
              <Button
                color="success"
                size="auto"
                shadow
                onClick={handleCreatePost}
              >
                등록
              </Button>
              <Button
                color="error"
                size="auto"
                shadow
                onClick={closePublishScreen}
              >
                닫기
              </Button>
            </ButtonWrapper>
          </Contents>
        </Container>
      )}
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(to right bottom, #f6d365, #ffc9ba);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  max-width: 350px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;

export default PublishScreen;
