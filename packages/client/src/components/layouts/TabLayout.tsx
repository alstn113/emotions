// components
import styled from '@emotion/styled';
import MobileHeader from '~/components/base/MobileHeader';
import Footer from '~/components/base/Footer';
import DesktopHeader from '~/components/base/DesktopHeader';

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
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default TabLayout;
