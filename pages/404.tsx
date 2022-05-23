import Layout from "@components/Layout"
import type { ReactElement } from "react"

import Isotipo from '@img/Isotipo.svg'

export default function NotFound () {
  return (
    <div className="notFound">
      <Isotipo className="notFound__img"/>
      <span>404 ERROR</span>
      <h1>¡Vaya!, parece que la página que buscas no existe.</h1>
    </div>
  )
}

NotFound.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}


