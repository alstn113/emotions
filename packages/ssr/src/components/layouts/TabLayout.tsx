// components
import styled from '@emotion/styled';
import FullHeightScreen from '~/components/base/FullHeightScreen';
import MobileHeader from '~/components/base/MobileHeader';
import Footer from '~/components/base/Footer';
import DesktopHeader from '~/components/base/DesktopHeader';

interface Props {
  children?: React.ReactNode;
}

const TabLayout = ({ children }: Props) => {
  return (
    <FullHeightScreen>
      <MobileHeader />
      <DesktopHeader />
      <Content>{children}</Content>
      <Footer />
    </FullHeightScreen>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
`;

export default TabLayout;
