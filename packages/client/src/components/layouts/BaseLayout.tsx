import styled from '@emotion/styled';

import DesktopHeader from '~/components/base/DesktopHeader';
import MobileHeader from '~/components/base/MobileHeader';

interface Props {
  backButton?: boolean;
  title?: string;
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
}

const BaseLayout = ({ children, backButton, headerRight, title }: Props) => {
  return (
    <Block>
      <MobileHeader
        backButton={backButton}
        headerRight={headerRight}
        title={title}
      />
      <DesktopHeader />
      <Content>{children}</Content>
    </Block>
  );
};

const Block = styled.div`
  position: relative;
  padding-top: 4rem;
  padding-bottom: 4rem;
  min-height: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default BaseLayout;
