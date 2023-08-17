import { forwardRef, InputHTMLAttributes } from 'react';

import { NormalColorType } from '~/lib/styles';

import * as S from './TextInput.styles';

export type InputVariantType = 'bordered' | 'underlined';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  color?: NormalColorType;
  variant?: InputVariantType;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    { placeholder, color = 'primary', variant = 'bordered', ...props },
    ref,
  ) {
    return (
      <S.Root>
        <S.Input
          autoComplete="off"
          placeholder=" "
          color={color}
          variant={variant}
          ref={ref}
          {...props}
        />
        {variant === 'underlined' && <S.Underline color={color} />}
        <S.Label color={color}>{placeholder}</S.Label>
      </S.Root>
    );
  },
);

export default TextInput;
