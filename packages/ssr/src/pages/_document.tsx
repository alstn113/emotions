import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#000000" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <meta property="og:title" content="Emotions" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/75781414/217350903-1dcffe1d-c480-4f20-8db2-6e507ec024c2.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://wap-dev.store/" />
        <meta property="og:description" content="Share Our Emotions" />
        <meta property="og:site_name" content="Emotions" />
        <meta property="og:locale" content="ko" />
      </Head>
      <body>
        <Main />
        <div id="modal"></div>
        <div id="bottom-sheet"></div>
        <NextScript />
      </body>
    </Html>
  );
}
