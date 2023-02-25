// react
import { NavLink } from 'react-router-dom';

// components
import styled from '@emotion/styled';
import { mediaQuery, zIndexes } from '~/lib/styles';
import { Home, Create, Search, Settings, Comment } from '~/components/vectors';
import useUser from '~/hooks/useUser';

const Footer = () => {
  const user = useUser();
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
      <TabItem to={`/user/${user?.username}`}>
        <Comment width={24} height={24} />
      </TabItem>
      <TabItem to="/setting">
        <Settings width={24} height={24} />
      </TabItem>
    </Container>
  );
};

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  z-index: ${zIndexes.Footer};
  display: flex;
  background: #000;

  ${mediaQuery.mobile} {
    display: none;
  }
`;

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

export default Footer;
