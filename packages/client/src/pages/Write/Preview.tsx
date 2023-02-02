import styled from '@emotion/styled';
import { mediaQuery } from '~/styles';

const Preview = () => {
  return <Container>Preview</Container>;
};

const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: #ff7c7c;
  display: none;
  ${mediaQuery.tablet} {
    display: flex;
  }
`;

export default Preview;
