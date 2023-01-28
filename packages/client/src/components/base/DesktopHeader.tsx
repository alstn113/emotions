import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '~/hooks/useUser';
import { mediaQuery } from '~/styles';
import { Button } from '../common';
import HeaderDropdown from './HeaderDropdown';

interface Props {}

const DesktopHeader = ({}: Props) => {
  const user = useUser();
  const navigate = useNavigate();

  return (
    <Container>
      <Logo to="/">iChat</Logo>
      <HeaderItems>
        {user ? (
          <HeaderDropdown />
        ) : (
          <Button shadow color="primary" size="sm" onClick={() => navigate('/setting')}>
            Login
          </Button>
        )}
      </HeaderItems>
    </Container>
  );
};

const Container = styled.header`
  position: relative;
  display: none;
  align-items: center;
  height: 60px;
  padding: 0px 16px;
  background: #000;

  ${mediaQuery.mobile} {
    display: flex;
  }
`;

const Logo = styled(Link)`
  font-family: 'PyeongChangPeace-Bold', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 10px;
  color: #fff;
  padding: 0 16px;
`;

const HeaderItems = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default DesktopHeader;
