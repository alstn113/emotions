// components
import styled from '@emotion/styled';
import { mediaQuery, zIndexes } from '~/lib/styles';
import HeaderBackButton from '~/components/base/HeaderBackButton';
import { Link } from 'react-router-dom';

interface Props {
  title?: React.ReactNode;
  backButton?: React.ReactNode;
  headerRight?: React.ReactNode;
}

const MobileHeader = ({
  title = 'Emotions',
  backButton = true,
  headerRight,
}: Props) => {
  return (
    <Container>
      {backButton && (
        <HeaderSide position="left">
          <HeaderBackButton />
        </HeaderSide>
      )}
      <Title to="/">{title}</Title>
      {headerRight && <HeaderSide position="right">{headerRight}</HeaderSide>}
    </Container>
  );
};

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${zIndexes.Header};

  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  padding: 0px 16px;
  background: #000;

  ${mediaQuery.mobile} {
    display: none;
  }
`;

const Title = styled(Link)`
  font-family: 'PyeongChangPeace-Bold', sans-serif;
  font-size: 1.5rem;
  color: #fff;
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
