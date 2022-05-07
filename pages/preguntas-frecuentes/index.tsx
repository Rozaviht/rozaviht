import Layout from "@components/Layout"
import type { ReactElement } from "react"

export default function FAQPage () {
  return (
    <div className="flexcolum flexcolum--around">
      <h1>Preguntas frecuentes Rozaviht</h1>
      <p>En esta página encontrarás las preguntas frecuentes que podrían hacerse nuestros clientes, con sus respectivas soluciones.</p>
      <p>Si aún trás haber visto las posibles preguntas sigues teniendo alguna duda, no dudes en consultarnos en nuestro campo de contacto.</p>
      <div>
        
      </div>
    </div>
  )
}


FAQPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}