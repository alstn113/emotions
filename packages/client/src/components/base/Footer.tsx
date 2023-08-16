import { useLocation, useNavigate } from 'react-router-dom';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Home, Create, Search, Settings, Comment } from '~/components/vectors';

import useUser from '~/hooks/useUser';

import { mediaQuery, zIndexes } from '~/lib/styles';

const Footer = () => {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const FooterItemList = [
    {
      to: '/',
      icon: <Home width={24} height={24} />,
      checkLogin: false,
    },
    {
      to: '/search',
      icon: <Search width={24} height={24} />,
      checkLogin: false,
    },
    {
      to: '/write',
      icon: <Create width={24} height={24} />,
      checkLogin: true,
    },
    {
      to: `/user/${user?.username}`,
      icon: <Comment width={24} height={24} />,
      checkLogin: true,
    },
    {
      to: '/setting',
      icon: <Settings width={24} height={24} />,
      checkLogin: false,
    },
  ];

  const handleClick = (checkLogin: boolean, to: string) => {
    if (checkLogin && !user) {
      navigate('/setting');
    } else {
      navigate(to);
    }
  };

  return (
    <Container>
      {FooterItemList.map((item) => {
        return (
          <TabItem
            key={item.to}
            active={location.pathname === item.to}
            onClick={() => handleClick(item.checkLogin, item.to)}
          >
            {item.icon}
          </TabItem>
        );
      })}
    </Container>
  );
};

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  z-index: ${zIndexes.Footer};
  display: flex;
  background: #000;

  ${mediaQuery.mobile} {
    display: none;
  }
`;

const TabItem = styled.div<{ active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    color: #808080;
    width: 28px;
    height: 28px;
  }
  ${({ active }) =>
    active &&
    css`
      svg {
        color: #fff;
      }
    `}
`;

export default Footer;
