import * as S from './Avatar.styles';
import BlankUser from '~/assets/vectors/blank-user.svg';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
}

const Avatar = ({
  src = BlankUser,
  alt = 'profile image',
  size = 'md',
}: AvatarProps) => {
  return (
    <S.Container size={size}>
      <S.Image src={src} alt={alt} />
    </S.Container>
  );
};

export default Avatar;
