import { NormalColorType } from '~/styles/';
import { ButtonHTMLAttributes } from 'react';
import * as S from './Button.styles';
import Ripple from './Ripple';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg' | 'auto';
  children: React.ReactNode;
  color?: NormalColorType;
  shadow?: boolean;
}

const Button = ({
  size = 'md',
  color = 'primary',
  children,
  shadow = false,
  ...options
}: ButtonProps) => {
  return (
    <S.Container size={size} color={color} shadow={shadow} {...options}>
      <Ripple />
      {children}
    </S.Container>
  );
};

export default Button;
