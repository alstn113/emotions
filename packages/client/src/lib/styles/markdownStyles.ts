import { css } from '@emotion/react';
import { mediaQuery } from './mediaQuery';
import { palette } from './palette';

export const markdownStyles = css`
  font-size: 1rem;
  line-height: 1;

  h1 {
    font-size: 2.25rem;
  }
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.25rem;
  }
  h4 {
    font-size: 1rem;
  }

  h1,
  h2,
  h3,
  h4 {
    margin-bottom: 0.75rem;
  }

  ${mediaQuery.tablet} {
    font-size: 1.125rem;

    h1 {
      font-size: 2.5rem;
    }
    h2 {
      font-size: 2rem;
    }
    h3 {
      font-size: 1.5rem;
    }
    h4 {
      font-size: 1.125rem;
    }

    h1,
    h2,
    h3,
    h4 {
      line-height: 1.5;
      margin-bottom: 1rem;
    }
  }

  color: ${palette.black};
  white-space: pre-wrap;
  word-break: keep-all;
  word-wrap: break-word;
  ul,
  ol,
  p {
    b {
      font-weight: 400;
    }
    code {
      background: #e9ecef;
      padding: 0.2em 0.4em;
      font-size: 85%;
      border-radius: 3px;
    }
    a {
      code {
        color: ${palette.primary};
      }
    }
  }

  a {
    color: ${palette.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  hr {
    border: none;
    height: 1px;
    width: 100%;
    background: #e9ecef;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  blockquote {
    margin: 1rem 0px;
    border-left: 8px solid #fab005;
    border-radius: 8px;
    background: #e9ecef;
    padding: 1rem 1rem 1rem 2rem;
    color: ${palette.black};
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 20px;
    line-height: 1;
  }

  ul ul {
    list-style-type: circle;
    margin-block-start: 0px;
    margin-block-end: 0px;
  }

  pre {
    font-size: 0.875rem;
    padding: 1rem;
    border-radius: 4px;
    line-height: 1.5;
    overflow-x: auto;
    letter-spacing: 0px;
    background-color: #e9ecef;
  }
`;
