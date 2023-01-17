import styled from '@emotion/styled';

const Header = () => {
  return <Container>iChat</Container>;
};

const Container = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-bottom: 3px solid gray;
  padding-left: 16px;
  padding-right: 16px;

  font-size: 1.5rem;
  font-weight: 700;
`;

export default Header;
