import { NormalColorType } from '~/lib/styles';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import * as S from './Button.styles';
import Ripple from './Ripple';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg' | 'auto';
  children: React.ReactNode;
  color?: NormalColorType;
  shadow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { size = 'md', color = 'primary', children, shadow = false, ...options },
  ref,
) {
  return (
    <S.Container
      size={size}
      color={color}
      shadow={shadow}
      {...options}
      ref={ref}
    >
      <Ripple />
      {children}
    </S.Container>
  );
});
export default Button;
