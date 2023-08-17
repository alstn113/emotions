import { Link, useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

import HeaderDropdown from '~/components/base/HeaderDropdown';
import { Button } from '~/components/common';

import useUser from '~/hooks/useUser';

import { zIndexes } from '~/lib/styles';
import { mediaQuery } from '~/lib/styles/mediaQuery';

import Logo from '~/assets/images/Logo.png';

const DesktopHeader = () => {
  const user = useUser();
  const navigate = useNavigate();

  return (
    <Container>
      <LogoLink to="/">
        <img src={Logo} />
        Emotions
      </LogoLink>
      <HeaderItems>
        {user ? (
          <>
            <Button shadow size="sm" onClick={() => navigate('/write')}>
              Write Post
            </Button>
            <HeaderDropdown />
          </>
        ) : (
          <Button
            shadow
            color="primary"
            size="sm"
            onClick={() => navigate('/setting')}
          >
            Login
          </Button>
        )}
      </HeaderItems>
    </Container>
  );
};

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${zIndexes.Header};

  display: none;
  align-items: center;
  height: 4rem;
  padding: 0px 16px;
  background: #000;

  ${mediaQuery.mobile} {
    display: flex;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'PyeongChangPeace-Bold', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 10px;
  color: #fff;
  padding: 0 16px;

  img {
    margin-right: 8px;
    width: 24px;
    height: 24px;
  }
`;

const HeaderItems = styled.div`
  flex: 1;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
`;

export default DesktopHeader;
