// components
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

const FullHeightScreen = ({ children }: Props) => {
  return (
    <Screen>
      <Global
        styles={css`
          html,
          body,
          #next {
            height: 100%;
          }
        `}
      />
      {children}
    </Screen>
  );
};

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default FullHeightScreen;
