import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/common';
import { useCreatePost, useGetPosts } from '~/hooks/queries/post';
import useWriteStore from '~/stores/useWriteStore';

const PublishScreen = () => {
  const { title, body, isPublishScreenOpen, closePublishScreen } =
    useWriteStore();
  const { mutate } = useCreatePost();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleCreatePost = () => {
    if (!title || !body) return alert('제목과 내용을 입력해주세요');
    mutate(
      { title, body },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries(useGetPosts.getKey());
          navigate('/');
        },
        onError: (e) => {
          console.log(e);
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
          transition={{ duration: 0.3, ease: 'linear' }}
        >
          <Contents>
            <Item>{title}</Item>
            <Item>{body}</Item>
            <ButtonWrapper>
              <Button shadow onClick={closePublishScreen}>
                닫기
              </Button>
              <Button shadow onClick={handleCreatePost}>
                등록
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
  background: linear-gradient(to bottom right, #ff00ff, #00ffff);

  //
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 200px;
  border-radius: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 30px;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 10px;

  overflow-y: scroll;
`;

export default PublishScreen;
