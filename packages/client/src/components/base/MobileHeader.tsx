import styled from '@emotion/styled';
import { glassmorphism, mediaQuery } from '~/styles';
import HeaderBackButton from './HeaderBackButton';

interface Props {
  title?: React.ReactNode;
  backButton?: React.ReactNode;
  headerRight?: React.ReactNode;
}

const MobileHeader = ({ title = 'iChat', backButton = true, headerRight }: Props) => {
  return (
    <Container>
      {backButton && (
        <HeaderSide position="left">
          <HeaderBackButton />
        </HeaderSide>
      )}
      <Title>{title}</Title>
      {headerRight && <HeaderSide position="right">{headerRight}</HeaderSide>}
    </Container>
  );
};

const Container = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0px 16px;
  background: #fff;
  border-bottom: 2px solid #cccccc;

  ${mediaQuery.tablet} {
    display: none;
  }
`;

const Title = styled.div`
  font-family: 'PyeongChangPeace-Bold', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
`;

const HeaderSide = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${(props) => props.position}: 16px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
`;

export default MobileHeader;
