import Head from 'next/head'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type {NextPage} from 'next'

import AppProvider from '../services/AppProvider'

import apolloClient from 'lib/apollo'

import '../styles/App.scss'
import { ApolloProvider } from '@apollo/client'


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

 export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
          <link rel="stylesheet" href="fonts/style.css" />
          <link rel="shortcut icon" sizes='224x256' type='image/ico' href="img/favicon.ico" />
          <title>Rozaviht: Te cuidas, Te cuidamos y Lo cuidamos</title>
          <meta name='description' content='En Rozaviht nuestro objetivo es proveer de productos a las personas que cuiden de ellas. Siempre sin dejar de lado el cuido medioambiental que nos define también como marca.' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1' />
          <meta name="apple-mobile-web-app-title" content="Rozaviht: Te cuidas, Te cuidamos y Lo cuidamos"/>
          <meta name="format-detection" content="telephone=no"/>
          <meta name="format-detection" content="address=no"/>   
      </Head>
      <ApolloProvider client={apolloClient} >
        <AppProvider>
          {getLayout(<Component {...pageProps} />)}
        </AppProvider>
      </ApolloProvider>
    </>

  )
}

