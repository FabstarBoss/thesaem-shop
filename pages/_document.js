import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Официальный интернет-магазин корейской косметики THE SAEM в России. Более 475 товаров: уход за кожей, макияж, защита от солнца. Быстрая доставка по всей России." />
        <meta property="og:site_name" content="THE SAEM" />
        <meta property="og:type" content="website" />
        <meta name="yandex-verification" content="REPLACE_WITH_YANDEX_CODE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
