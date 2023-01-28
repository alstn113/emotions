import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { mediaQuery } from '~/styles';
import { Home, Create, Search, Settings, Comment } from '../vectors';

const Footer = () => {
  return (
    <Container>
      <TabItem to="/">
        <Home width={24} height={24} />
      </TabItem>
      <TabItem to="/search">
        <Search width={24} height={24} />
      </TabItem>
      <TabItem to="/write">
        <Create width={24} height={24} />
      </TabItem>
      <TabItem to="/room">
        <Comment width={24} height={24} />
      </TabItem>
      <TabItem to="/setting">
        <Settings width={24} height={24} />
      </TabItem>
    </Container>
  );
};

const TabItem = styled(NavLink)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: #808080;
    width: 28px;
    height: 28px;
  }
  &.active {
    svg {
      color: #fff;
    }
  }
`;

const Container = styled.footer`
  display: flex;
  height: 60px;
  background: #000;

  ${mediaQuery.mobile} {
    display: none;
  }
`;

export default Footer;
