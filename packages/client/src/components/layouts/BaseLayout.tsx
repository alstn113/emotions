// components
import styled from '@emotion/styled';
import FullHeightScreen from '~/components/base/FullHeightScreen';
import MobileHeader from '~/components/base/MobileHeader';
import DesktopHeader from '~/components/base/DesktopHeader';

interface Props {
  backButton?: boolean;
  title?: string;
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
}

const BaseLayout = ({ children, backButton, headerRight, title }: Props) => {
  return (
    <FullHeightScreen>
      <MobileHeader
        backButton={backButton}
        headerRight={headerRight}
        title={title}
      />
      <DesktopHeader />
      <Content>{children}</Content>
    </FullHeightScreen>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
`;

export default BaseLayout;
