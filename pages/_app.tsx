<<<<<<< HEAD
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '@components/Layout'
=======
import Head from 'next/head'
import AppProvider from '../services/AppProvider'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apolloClient'
>>>>>>> develop

import type { AppContext, AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type {NextPage} from 'next'

import '../styles/App.scss'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

 export default function MyApp({ Component, pageProps }: AppContext & AppPropsWithLayout) {

  const apolloClient = useApollo(pageProps)

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
<<<<<<< HEAD
    <SessionProvider session={pageProps.session}>
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
    </SessionProvider>
    )
=======
    <>
      <Head>
          <link rel="stylesheet" href="../fonts/style.css" />
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
>>>>>>> develop
}

