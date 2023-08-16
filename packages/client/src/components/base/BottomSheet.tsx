import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

import Portal from '~/components/base/Portal';

import { zIndexes } from '~/lib/styles';

interface item {
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
}

interface Props {
  visible: boolean;
  onCancel: () => void;
  items: item[];
}

const BottomSheet = ({ visible, onCancel, items }: Props) => {
  return (
    <Portal id="bottom-sheet">
      <AnimatePresence>
        {visible && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onCancel}
            />
            <Positioner>
              <Sheet
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '100%' }}
                transition={{ damping: 0 }}
                onClick={onCancel}
              >
                {items.map((item) => {
                  return (
                    <MenuItem key={item.name} onClick={item.onClick}>
                      <MenuItemText>
                        {item.icon} {item.name}
                      </MenuItemText>
                    </MenuItem>
                  );
                })}
              </Sheet>
            </Positioner>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: ${zIndexes.Modal};
`;

const Positioner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  z-index: ${zIndexes.Modal};
`;

const Sheet = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const MenuItem = styled.div`
  padding: 1rem;
  cursor: pointer;
`;

const MenuItemText = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  line-height: 1rem;
  color: #000;
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export default BottomSheet;
