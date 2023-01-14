import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

const FullHeightScreen = ({ children }: Props) => {
  return (
    <Screen>
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
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
  background: linear-gradient(to bottom, #ff4f8b, #dff1ff);

  .color {
    position: absolute;
    filter: blur(150px);
  }

  .color:nth-of-type(1) {
    top: -35%;
    background: #ff359b;
    width: 60%;
    height: 60%;
  }

  .color:nth-of-type(2) {
    bottom: 0;
    left: 10%;
    background: #fffd87;
    width: 50%;
    height: 40%;
  }

  .color:nth-of-type(3) {
    bottom: 0;
    right: 0;
    background: #00d2ff;
    width: 30%;
    height: 20%;
  }
`;

export default FullHeightScreen;
