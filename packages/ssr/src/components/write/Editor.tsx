import styled from '@emotion/styled';
import { Button } from '~/components/common';
import useWriteStore from '~/stores/useWriteStore';
import TextareaAutosize from 'react-textarea-autosize';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TagInput from './TagInput';

const Editor = () => {
  const { title, body, changeTitle, changeBody, openPublishScreen } =
    useWriteStore();
  const navigate = useNavigate();

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <EditorHeader>
        <PostTitle
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => changeTitle(e.target.value)}
          maxRows={2}
        />
        <TagInput />
      </EditorHeader>
      <EditorBody>
        <PostBody
          placeholder="내용을 입력하세요"
          value={body}
          onChange={(e) => changeBody(e.target.value)}
        />
      </EditorBody>
      <EditorFooter>
        <Button shadow color="error" onClick={() => navigate('/')}>
          Exit
        </Button>
        <Button shadow color="success" onClick={openPublishScreen}>
          Publish
        </Button>
      </EditorFooter>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;

const EditorHeader = styled.div`
  padding-top: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const PostTitle = styled(TextareaAutosize)`
  background: transparent;
  display: block;
  padding: 0;
  font-size: 2.5rem;
  width: 100%;
  resize: none;
  line-height: 1.2;
  outline: none;
  border: none;
  font-weight: bold;
  color: #000;
  &::placeholder {
    color: #999;
  }
`;

const EditorBody = styled.div`
  flex: 1;
  width: 100%;
`;

const PostBody = styled.textarea`
  padding: 1rem 3rem;
  background: transparent;
  display: block;
  font-size: 1.2rem;
  width: 100%;
  height: 100%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  color: #000;
  &::placeholder {
    color: #999;
  }
`;

const EditorFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 4rem;
  position: relative;
  bottom: 0;
  width: 100%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

export default Editor;
