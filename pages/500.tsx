import Layout from "@components/Layout"
import type { ReactElement } from "react"

import Isotipo from '@img/Isotipo.svg'

export default function Custom500 () {
  return (
    <div className="notFound">
      <Isotipo className="notFound__img"/>
      <span>500 ERROR</span>
      <h1>Lo sentimos parace que ha habido un problema con el servidor.</h1>
    </div>
  )
}

Custom500.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
