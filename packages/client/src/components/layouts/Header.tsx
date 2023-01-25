import styled from '@emotion/styled';
import { glassmorphism } from '~/styles';
import HeaderBackButton from './HeaderBackButton';

interface Props {
  title?: React.ReactNode;
  backButton?: React.ReactNode;
  headerRight?: React.ReactNode;
}

const Header = ({ title = 'iChat', backButton, headerRight }: Props) => {
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
  height: 50px;
  padding-left: 16px;
  padding-right: 16px;

  margin: 8px 16px;

  ${glassmorphism}
`;

const Title = styled.div`
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

export default Header;
