// react
import { useRef } from 'react';

// hooks
import useDisclosure from '~/hooks/useDisclosure';
import useOnClickOutside from '~/hooks/useOnClickOutside';

// components
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { zIndexes } from '~/styles';
import { MenuDots } from '~/components/vectors';

interface MoreVertMenuItem {
  name: string;
  onClick: () => void;
}

interface Props {
  items: MoreVertMenuItem[];
}

const MoreVertMenu = ({ items }: Props) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside(triggerRef, onClose);

  return (
    <div>
      <MoreButton ref={triggerRef} onClick={onToggle}>
        <MenuDots />
      </MoreButton>
      <Relative>
        <AnimatePresence initial={false}>
          {isOpen && (
            <Menu
              initial={{ scale: 0.9, opacity: 0.2 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.3 }}
            >
              {items.map((item) => {
                return (
                  <MenuItem onClick={item.onClick}>
                    <MenuItemText>{item.name}</MenuItemText>
                  </MenuItem>
                );
              })}
            </Menu>
          )}
        </AnimatePresence>
      </Relative>
    </div>
  );
};

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #000;
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Relative = styled.div`
  position: relative;
`;

const Menu = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  // 기준점
  transform-origin: right top;
  margin-top: 0.5rem;
  padding: 8px;
  background: #26292b;
  border-radius: 12px;
  z-index: ${zIndexes.popper};
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 80px;
  padding: 0.5rem;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #495057;
  }
`;

const MenuItemText = styled.span`
  text-align: left;
  font-size: 0.8rem;
  line-height: 0.8rem;
  color: #fff;
`;

export default MoreVertMenu;
