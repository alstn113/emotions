import styled from '@emotion/styled';
import useWriteStore from '~/stores/useWriteStore';
import { mediaQuery } from '~/styles';

const Preview = () => {
  const { title, body } = useWriteStore();
  return (
    <Container>
      <ContentsWrapper>
        <Title>{title}</Title>
        <MarkdownBody>{body}</MarkdownBody>
      </ContentsWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #f8f9fa;
  display: none;
  ${mediaQuery.tablet} {
    display: flex;
    width: 100%;
  }
`;

const ContentsWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 4rem;
  overflow-y: scroll;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 2.5em;
  line-height: 1.2;
  font-weight: 800;
  margin-bottom: 3rem;
`;

const MarkdownBody = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  flex: 1;
`;

export default Preview;
