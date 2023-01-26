import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { mediaQuery } from '~/styles';

interface Props {}

const DesktopHeader = ({}: Props) => {
  return (
    <Container>
      <Title to="/">iChat</Title>
    </Container>
  );
};

const Container = styled.header`
  position: relative;
  display: none;
  align-items: center;
  height: 60px;
  padding: 0px 16px;
  background: #fff;
  border-bottom: 2px solid #cccccc;

  ${mediaQuery.mobile} {
    display: flex;
  }
`;

const Title = styled(Link)`
  font-family: 'PyeongChangPeace-Bold', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 10px;
  background: #fff;
  padding: 8px 16px;
`;

export default DesktopHeader;
