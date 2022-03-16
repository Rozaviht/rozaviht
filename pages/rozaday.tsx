import Image from 'next/image'

import type { ReactElement } from 'react'

import Layout from '@components/Layout'

import rozadayLogo from '@img/rozaday-logo.png'
import rozadayBanner from '@img/rozaday-banner.jpeg'

export default function rozadayPage () {
  return(
    <div className="rozaday">
      <div className="rozaday-hero">
        <div className="rozaday-logo">
          <Image src={rozadayLogo} height={100} width={400} layout="responsive"/>
        </div>
        <h3>Nunca te quedes desinformado de lo que te importa</h3>
        <div className="rozaday-banner">
          <Image src={rozadayBanner} height={120} width={235} layout="responsive" priority/>
        </div>
      </div>
      <div className="rozaday-articles">
        <h2>Articulos</h2>
      </div>
    </div>
  )
}

rozadayPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}