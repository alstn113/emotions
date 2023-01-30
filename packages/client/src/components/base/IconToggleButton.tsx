import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  inactiveIcon: React.ReactNode;
  activeIcon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  size?: Size;
}

type Size = 'sm' | 'md';

const IconToggleButton = ({ inactiveIcon, activeIcon, isActive, onClick, size = 'md' }: Props) => {
  return (
    <IconButton size={size} onClick={onClick}>
      <AnimatePresence initial={false}>
        {isActive ? (
          <IconWrapper
            key="active"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {activeIcon}
          </IconWrapper>
        ) : (
          <IconWrapper
            key="inactive"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {inactiveIcon}
          </IconWrapper>
        )}
      </AnimatePresence>
    </IconButton>
  );
};

const IconButton = styled.button<{ size: Size }>`
  position: relative;
  padding: 0;
  ${({ size }) =>
    size === 'md' &&
    css`
      width: 24px;
      height: 24px;
    `}

  ${(props) =>
    props.size === 'sm' &&
    css`
      width: 16px;
      height: 16px;
    `}

  svg {
    width: 100%;
    height: 100%;
  }
`;
const IconWrapper = styled(motion.span)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default IconToggleButton;
