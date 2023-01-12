import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import FullHeightScreen from './FullHeightScreen';

const TabLayout = () => {
  return (
    <FullHeightScreen>
      <Content>
        <Outlet />
      </Content>
    </FullHeightScreen>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  overflow-x: hidden;
`;

export default TabLayout;
