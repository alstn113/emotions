import styled from '@emotion/styled';
import { glassmorphism } from '~/styles';

const Header = () => {
  return <Container>iChat</Container>;
};

const Container = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding-left: 16px;
  padding-right: 16px;

  margin: 8px 16px;

  ${glassmorphism}

  // font
  font-size: 1.5rem;
  font-weight: 700;
`;

export default Header;
