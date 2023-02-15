import { css } from '@emotion/react';
import { mediaQuery } from './mediaQuery';
import { palette } from './palette';

export const markdownStyles = css`
  p {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  h1 {
    font-size: 24px;
  }
  h2,
  h3,
  h4,
  h5 {
    margin-top: 8px;
    margin-bottom: 8px;
    line-height: 1.5;
    font-size: 14px;
    ${mediaQuery.tablet} {
      font-size: 16px;
    }
    margin: 0;
  }

  ul,
  ol {
    list-style: initial;
    margin-top: 8px;
    margin-bottom: 8px;
    ul,
    ol {
      margin: 0;
    }
    p {
      margin: 0;
    }
  }
  a {
    color: ${palette.primary};
  }

  pre {
    font-family: 'Fira Mono', source-code-pro, Menlo, Monaco, Consolas,
      'Courier New', monospace;
    font-size: 0.875rem;
    padding: 1rem;
    border-radius: 4px;
    line-height: 1.5;
    overflow-x: auto;
    letter-spacing: 0px;
    background-color: ${palette.gray};
  }

  blockquote {
    margin: 2rem 0px;
    border-left: 4px solid ${palette.primary};
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: ${palette.gray};
    padding: 1rem 1rem 1rem 2rem;
    color: ${palette.black};
  }
`;
