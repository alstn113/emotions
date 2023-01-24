import styled from '@emotion/styled';
import Footer from './Footer';
import FullHeightScreen from './FullHeightScreen';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  return (
    <FullHeightScreen>
      <Background>
        <Header />
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <Content>{children}</Content>
        <Footer />
      </Background>
    </FullHeightScreen>
  );
};

const Background = styled.div`
  position: relative;
  background: linear-gradient(to bottom, #ff87af, #dff1ff);
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  overflow-x: hidden;

  .color {
    position: absolute;
    filter: blur(150px);
  }
  .color:nth-of-type(1) {
    top: -35%;
    background: #ff87af;
    width: 30%;
    height: 30%;
  }
  .color:nth-of-type(2) {
    bottom: 0;
    left: 10%;
    background: #fffec8;
    width: 50%;
    height: 40%;
  }
  .color:nth-of-type(3) {
    bottom: 0;
    right: 0;
    background: #a6efff;
    width: 30%;
    height: 20%;
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  overflow-x: hidden;
`;

export default BaseLayout;
