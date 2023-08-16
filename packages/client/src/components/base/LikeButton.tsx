import styled from '@emotion/styled';

import IconToggleButton from '~/components/base/IconToggleButton';
import { HeartFill, HeartOutline } from '~/components/vectors';

interface Props {
  onClick?: () => void;
  isLiked?: boolean;
  size?: Size;
}

type Size = 'sm' | 'md';

const LikeButton = ({ onClick, isLiked, size = 'md' }: Props) => {
  return (
    <IconToggleButton
      size={size}
      onClick={onClick}
      isActive={isLiked}
      activeIcon={<StyledHeartFill />}
      inactiveIcon={<StyledHeartOutline />}
    />
  );
};

const StyledHeartFill = styled(HeartFill)`
  color: #ff5a5a;
`;

const StyledHeartOutline = styled(HeartOutline)`
  color: #999;
`;

export default LikeButton;
