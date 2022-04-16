import Image from 'next/image'

import type { ReactElement } from "react"

import Layout from '@components/Layout'

import privacyBanner from '@img/privacy-banner4.webp'

export default function PrivacyPage () {
  return (
    <div className="legalPage">
      <div className="legalPage__banner">
        <h1 className="legalPage__title" >POLÍTICA DE PRIVACIDAD Y SEGURIDAD DE ROZAVIHT</h1>
        <Image src={privacyBanner} layout="responsive"/>
      </div>
      <div>

      </div>
    </div>
  )
}

PrivacyPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}