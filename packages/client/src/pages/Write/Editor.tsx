import styled from '@emotion/styled';
import { Button } from '~/components/common';
import useWriteStore from '~/stores/useWriteStore';
import TextareaAutosize from 'react-textarea-autosize';

const Editor = () => {
  const { title, body, changeTitle, changeBody, openPublishScreen } =
    useWriteStore();

  return (
    <Container>
      <EditorHeader>
        <PostTitle
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => changeTitle(e.target.value)}
          maxRows={2}
        />
      </EditorHeader>
      <EditorBody>
        <PostBody
          placeholder="내용을 입력하세요"
          value={body}
          onChange={(e) => changeBody(e.target.value)}
        />
      </EditorBody>
      <EditorFooter>
        <Button shadow onClick={openPublishScreen}>
          Publish
        </Button>
      </EditorFooter>
    </Container>
  );
};

const Container = styled.div`
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
  line-height: 1.5;
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
  padding: 3rem;
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

const EditorFooter = styled.div``;

export default Editor;
