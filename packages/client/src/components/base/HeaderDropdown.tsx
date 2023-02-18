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
import { motion, Variants } from 'framer-motion';
import { zIndexes } from '~/lib/styles';
import { Button } from '~/components/common';
import { User } from '~/components/vectors';

const HeaderDropdown = () => {
  const user = useUser();
  const logout = useLogout();
  const navigate = useNavigate();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside(triggerRef, onClose);
  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'}>
      <DropdownButton
        shadow
        color="success"
        size="sm"
        ref={triggerRef}
        onClick={onToggle}
      >
        <User />
        {user?.username}
      </DropdownButton>
      <DropdownMenu
        variants={{
          open: {
            scale: 1,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            scale: 0,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
      >
        <MenuItem
          variants={itemVariants}
          onClick={() => navigate(`/user/${user?.username}`)}
        >
          <MenuItemText>My Page</MenuItemText>
        </MenuItem>
        <MenuItem variants={itemVariants} onClick={() => navigate('/')}>
          <MenuItemText>Posts</MenuItemText>
        </MenuItem>
        <MenuItem variants={itemVariants} onClick={() => navigate('/search')}>
          <MenuItemText>Search</MenuItemText>
        </MenuItem>
        <MenuItem variants={itemVariants} onClick={() => navigate('/setting')}>
          <MenuItemText>Setting</MenuItemText>
        </MenuItem>
        <MenuItem variants={itemVariants} onClick={logout} red>
          <MenuItemText>Logout</MenuItemText>
        </MenuItem>
      </DropdownMenu>
    </motion.nav>
  );
};

const DropdownButton = styled(Button)`
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
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

const MenuItem = styled(motion.button)<{ red?: boolean }>`
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
