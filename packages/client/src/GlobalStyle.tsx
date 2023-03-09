import { Global, css } from '@emotion/react';

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        ${reset}
        * {
          box-sizing: border-box;
        }
        html,
        body,
        #root {
          height: 100%;
        }
        input {
          outline: none;
          border: none;
        }
        input:focus {
          outline: none;
        }
        button {
          border: none;
          outline: none;
          background: none;
          cursor: pointer;
        }
        a {
          text-decoration: none;
          color: #000;
        }
        @font-face {
          font-family: 'PyeongChangPeace-Bold';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChangPeace-Bold.woff2')
            format('woff2');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'Pretendard';
          src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css');
          font-weight: normal;
          font-style: normal;
        }

        body {
          font-family: 'Pretendard', sans-serif;
        }

        // 모바일에서 tap highlight 제거
        // transparent로 하면 안됨 (투명하게 보이는 경우가 있음)
        * {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
      `}
    />
  );
};

const reset = css`
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  /* ol,
  ul {
    list-style: none;
  } */
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;
