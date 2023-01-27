// react
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// hooks
import useUser from '~/hooks/useUser';
import useDisclosure from '~/hooks/useDisclosure';
import useOnClickOutside from '~/hooks/useOnClickOutside';
import useLogout from '~/hooks/useLogout';

// components
import { AnimatePresence, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { zIndexes } from '~/styles';
import { Button } from '../common';
import { User } from '../vectors';

const HeaderDropdown = () => {
  const user = useUser();
  const logout = useLogout();
  const naviagate = useNavigate();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside(triggerRef, onClose);

  return (
    <>
      <DropdownButton shadow color="success" size="md" ref={triggerRef} onClick={onToggle}>
        <User />
        {user?.username}
      </DropdownButton>
      <AnimatePresence initial={false}>
        {isOpen && (
          <DropdownMenu
            initial={{ scale: 0.9, opacity: 0.2 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.3 }}
          >
            <MenuItem onClick={() => naviagate('/write')}>
              <MenuItemText>Write Post</MenuItemText>
            </MenuItem>
            <MenuItem onClick={() => naviagate('/bookmarks')}>
              <MenuItemText>Bookmarks</MenuItemText>
            </MenuItem>
            <MenuItem onClick={() => naviagate('/settings')}>
              <MenuItemText>Settings</MenuItemText>
            </MenuItem>
            <MenuItem onClick={logout}>
              <MenuItemText>Logout</MenuItemText>
            </MenuItem>
          </DropdownMenu>
        )}
      </AnimatePresence>
    </>
  );
};

const DropdownButton = styled(Button)`
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 60px;
  right: 10px;
  // 기준점
  transform-origin: right top;
  margin-top: 0.5rem;
  padding: 8px;
  background: #26292b;
  border-radius: 14px;
  z-index: ${zIndexes.Header};
`;

const MenuItem = styled.button`
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
`;

export const MenuItemText = styled.span`
  flex: 1 1 0%;
  font-size: 16px;
  text-align: left;
  line-height: 36px;
  height: 36px;
  border-radius: 14px;
  color: #fff;
`;

export default HeaderDropdown;
