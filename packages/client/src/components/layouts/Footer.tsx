import styled from '@emotion/styled';

const Footer = () => {
  return <Container>Interactive Chat</Container>;
};

const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-top: 3px solid gray;
  padding-left: 16px;
  padding-right: 16px;

  font-size: 1.2rem;
  font-weight: 700;
`;

export default Footer;
