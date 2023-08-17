import BlankUser from '~/assets/vectors/blank-user.svg';

import * as S from './Avatar.styles';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src: string | null;
  alt?: string;
  size?: AvatarSize;
  isBorder?: boolean;
}

const Avatar = ({
  src = BlankUser,
  alt = 'profile image',
  size = 'md',
  isBorder = false,
}: AvatarProps) => {
  const imageSrc = src || BlankUser;
  return (
    <S.Container size={size} isBorder={isBorder}>
      <S.Image src={imageSrc} alt={alt} />
    </S.Container>
  );
};

export default Avatar;
