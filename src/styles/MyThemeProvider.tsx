import { ThemeProvider } from '@emotion/react';
import { GlobalStyle } from './GlobalStyle';
import { lightTheme } from './theme';

interface Props {
  children: React.ReactNode;
}

const MyThemeProvider = ({ children }: Props) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default MyThemeProvider;
