import { AppProps } from 'next/app'
import Layout from '@components/Layout'
import AppProvider from '../services/AppProvider'

import '../pages/styles/App.scss'

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
        <style jsx global>{`
          *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            color: #3f3e3e;
            font-family: DIN-Medium;
          }

          html {
            height: 100vh;
            font-size: 100%;
            background-color: #cecece
          }

          body,
          #__next{
            min-height: 100%;
            display: contents;
          }

          .font-Lora {
            font-family: Lora-Medium;
          }
        `}</style>
      </Layout>
    </AppProvider>
    )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp