import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { mediaQuery } from '~/styles';
import { Home, Bookmark, PlusCircle, Search, Setting } from '../vectors';

const Footer = () => {
  return (
    <Container>
      <TabItem to="/">
        <Home width={24} height={24} />
      </TabItem>
      <TabItem to="/search">
        <Search width={24} height={24} />
      </TabItem>
      <TabItem to="/create">
        <PlusCircle width={24} height={24} />
      </TabItem>
      <TabItem to="/bookmarks">
        <Bookmark width={24} height={24} />
      </TabItem>
      <TabItem to="/settings">
        <Setting width={24} height={24} />
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
    width: 32px;
    height: 32px;
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
