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
      <Header />
      <Content>
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        {children}
      </Content>
      <Footer />
    </FullHeightScreen>
  );
};

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  padding: 16px;

  background: linear-gradient(to bottom, #ff4f8b, #dff1ff);

  .color {
    position: absolute;
    filter: blur(150px);
  }

  .color:nth-of-type(1) {
    top: -35%;
    background: #f598fd;
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

export default BaseLayout;
