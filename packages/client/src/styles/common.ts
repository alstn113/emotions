import { css } from '@emotion/react';

export const glassmorphism = css`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 12px 0 rgba(100, 100, 100, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const customMediaQuery = (maxWidth: number) => `
  @media (min-width: ${maxWidth}px)
`;

export const mediaQuery = {
  custom: customMediaQuery,
  mobile: customMediaQuery(500),
  tablet: customMediaQuery(768),
  desktop: customMediaQuery(1440),
} as const;

export type NormalColorType = 'primary' | 'success' | 'secondary' | 'warning' | 'error';

export const palette = {
  white: '#ffffff',
  gray: '#dfe6e9',
  black: '#000000',
  primary: '#0072F5',
  secondary: '#7828C8',
  success: '#17C964',
  warning: '#F5A524',
  error: '#F31260',
} as const;

export const zIndexes = {
  Header: 10,
  Footer: 10,
  Modal: 100,
  ChatInput: 20,
  DynamicIsland: 20,
};
