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
    top: -350px;
    background: #ff359b;
    width: 600px;
    height: 600px;
  }

  .color:nth-of-type(2) {
    bottom: -150px;
    left: 100px;
    background: #fffd87;
    width: 500px;
    height: 500px;
  }

  .color:nth-of-type(3) {
    bottom: -50px;
    right: 0;
    background: #00d2ff;
    width: 300px;
    height: 300px;
  }
`;

export default FullHeightScreen;
