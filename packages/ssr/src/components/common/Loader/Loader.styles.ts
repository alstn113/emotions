import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { palette, type NormalColorType } from '~/lib/styles';

const BarKeyframes = keyframes`
  0% {
    transform: none;
  }
  25% {
    transform: scaleY(2);
  }
  50%,
  100% {
    transform: none;
  }
`;

export const Container = styled.div<{ size: 'sm' | 'md' | 'lg' }>`
  display: flex;
  justify-content: space-around;
  ${({ size }) => {
    if (size === 'sm') {
      return css`
        width: 1.75rem;
        height: 0.875rem;
        div {
          width: 0.25rem;
          height: 100%;
        }
      `;
    } else if (size === 'md') {
      return css`
        width: 2.7rem;
        height: 1.375rem;
        div {
          width: 0.375rem;
          height: 100%;
        }
      `;
    } else if (size === 'lg') {
      return css`
        width: 4.5rem;
        height: 2.25rem;
        div {
          width: 0.6rem;
          height: 100%;
        }
      `;
    }
  }}
`;

export const Bar = styled.div<{
  color: NormalColorType;
  delay: number;
}>`
  animation: ${BarKeyframes} 1s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay + 's'};
  background-color: ${({ color }) => palette[color]};
`;
