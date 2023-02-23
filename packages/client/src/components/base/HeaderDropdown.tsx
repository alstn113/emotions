// react
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// hooks
import useUser from '~/hooks/useUser';
import useDisclosure from '~/hooks/useDisclosure';
import useOnClickOutside from '~/hooks/useOnClickOutside';
import useLogout from '~/hooks/useLogout';

// components
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import { zIndexes } from '~/lib/styles';
import { Avatar } from '~/components/common';
import CaretDown from '../vectors/CaretDown';

const HeaderDropdown = () => {
  const user = useUser();
  const logout = useLogout();
  const navigate = useNavigate();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const triggerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(triggerRef, onClose);

  const MenuItemList = [
    {
      text: 'My Page',
      onClick: () => navigate(`/user/${user?.username}`),
      red: false,
    },
    {
      text: 'Posts',
      onClick: () => navigate('/'),
      red: false,
    },
    {
      text: 'Search',
      onClick: () => navigate('/search'),
      red: false,
    },
    {
      text: 'Setting',
      onClick: () => navigate('/setting'),
      red: false,
    },
    {
      text: 'Logout',
      onClick: logout,
      red: true,
    },
  ];

  return (
    <>
      <DropdownButton ref={triggerRef} onClick={onToggle}>
        <Avatar src={user?.profileImage || null} size="md" isBorder />
        <UserInfo>
          <div className="username">{user?.username}</div>
          <div className="displayName">@{user?.displayName}</div>
        </UserInfo>
        <CaretDown />
      </DropdownButton>
      <AnimatePresence initial={false}>
        {isOpen && (
          <DropdownMenu
            initial={{ scale: 0.7, opacity: 0.2 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.2 }}
          >
            {MenuItemList.map((item) => (
              <MenuItem key={item.text} onClick={item.onClick} red={item.red}>
                <MenuItemText>{item.text}</MenuItemText>
              </MenuItem>
            ))}
          </DropdownMenu>
        )}
      </AnimatePresence>
    </>
  );
};

const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  svg {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
  &:hover {
    color: #afb8c1;
  }

  // 글 선택 못하게 막기
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 60px;
  right: 10px;
  // 기준점
  transform-origin: 70% top;
  margin-top: 0.5rem;
  padding: 8px;
  background: #26292b;
  border-radius: 14px;
  z-index: ${zIndexes.popper};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 8px;

  .username {
    font-size: 14px;
    font-weight: 500;
    color: #ecedee;
  }

  .displayName {
    font-size: 12px;
    color: #787f85;
    font-weight: 400;
  }
`;

const MenuItem = styled(motion.div)<{ red?: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  height: 36px;
  padding: 0 12px;
  justify-content: center;
  border-radius: 9px;
  cursor: pointer;
  &:hover {
    background-color: #495057;
  }
  transition: background-color 0.2s;
  ${({ red }) =>
    red &&
    css`
      background-color: #3f0b1f;
      &:hover {
        background-color: #300313;
      }
      span {
        color: #f4256d;
      }
    `}
`;

const MenuItemText = styled.span`
  flex: 1 1 0%;
  font-size: 16px;
  text-align: left;
  line-height: 36px;
  height: 36px;
  border-radius: 14px;
  color: #fff;
`;

export default HeaderDropdown;
