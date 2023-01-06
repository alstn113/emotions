import { Theme } from '@emotion/react';

export type ThemeType = 'lightTheme' | 'darkTheme';

const defaultTheme: Theme = {};

export const lightTheme: Theme = {
  ...defaultTheme,
  bg_page1: '#fff',
  bg_page2: '#fff',
};

export const darkTheme: Theme = {
  ...defaultTheme,
  bg_page1: '#000',
  bg_page2: '#000',
};
