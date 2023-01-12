import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

const FullHeightScreen = ({ children }: Props) => {
  return (
    <Screen>
      {children}
      <Global
        styles={css`
          html,
          body,
          #root {
            height: 100%;
          }
        `}
      ></Global>
    </Screen>
  );
};

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%);
`;

export default FullHeightScreen;
