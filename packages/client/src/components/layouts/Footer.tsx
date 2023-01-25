import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { glassmorphism } from '~/styles';
import { Home, Bookmark, PlusCircle, Search, Setting } from '../vectors';

const FooterTab = () => {
  return (
    <Container>
      <TabItem to="/room">
        <Home width={24} height={24} />
      </TabItem>
      <TabItem to="/test">
        <Search width={24} height={24} />
      </TabItem>
      <TabItem to="/test">
        <PlusCircle width={24} height={24} />
      </TabItem>
      <TabItem to="/test">
        <Bookmark width={24} height={24} />
      </TabItem>
      <TabItem to="/test">
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
      color: #000000;
    }
  }
`;

const Container = styled.footer`
  display: flex;
  height: 50px;
  margin: 8px 16px;

  ${glassmorphism}
`;

export default FooterTab;
