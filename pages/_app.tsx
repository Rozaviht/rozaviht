import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type {NextPage} from 'next'

import AppProvider from '../services/AppProvider'

import '../pages/styles/App.scss'


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

 export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <AppProvider>
      {getLayout(<Component {...pageProps} />)}
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


