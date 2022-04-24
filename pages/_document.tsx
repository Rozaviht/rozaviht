import Document, { Html, Head, Main, NextScript } from 'next/document'



class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://rozaviht-media.s3.eu-west-3.amazonaws.com/DIN-Medium.otf" />
          <link rel="stylesheet" href="https://rozaviht-media.s3.eu-west-3.amazonaws.com/DIN-Bold.otf" />
          <link rel="stylesheet" href="https://rozaviht-media.s3.eu-west-3.amazonaws.com/Lora-Regular.ttf" />
          <link rel="stylesheet" href="https://rozaviht-media.s3.eu-west-3.amazonaws.com/Lora-Medium.ttf" />
          <title>Rozaviht: Cuidado personal y medioambiental</title>
          <meta name='description' content='En Rozaviht nuestro objetivo es proveer de productos a las personas que cuiden de ellas. Siempre sin dejar de lado el cuido medioambiental que nos define también como marca.' />
          <meta name='viewport' content='width=device-width,initial-scale=1.0' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument