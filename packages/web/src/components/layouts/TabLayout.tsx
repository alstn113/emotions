import styled from '@emotion/styled';

import DesktopHeader from '~/components/base/DesktopHeader';
import Footer from '~/components/base/Footer';
import MobileHeader from '~/components/base/MobileHeader';

interface Props {
  children?: React.ReactNode;
}

const TabLayout = ({ children }: Props) => {
  return (
    <Block>
      <MobileHeader />
      <DesktopHeader />
      <Content>{children}</Content>
      <Footer />
    </Block>
  );
};

const Block = styled.div`
  position: relative;
  padding-top: 4rem;
  padding-bottom: 4rem;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export default TabLayout;
