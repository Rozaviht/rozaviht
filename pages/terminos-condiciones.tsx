import Image from 'next/image'

import type { ReactElement } from "react"

import Layout from '@components/Layout'

import privacyBanner from '@img/terms-banner2.webp'

export default function termsPage () {
  return (
    <div className="legalPage">
      <div className="legalPage__banner">
        <h1 className="legalPage__title" >TERMINOS Y CONDICIONES DE USO</h1>
        <Image src={privacyBanner} layout="responsive"/>
      </div>
      <div>

      </div>
    </div>
  )
}

termsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}