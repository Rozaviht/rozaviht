import Layout from "@components/Layout"
import Image from "next/image"
import type { ReactElement } from "react"

export default function aboutPage () {
  return (
    <div className="aboutPage">
      <div className="aboutPage__hero">
        <h1>Sobre nosotros</h1>
        <p>"Te cuidas, Te cuidamos y Lo cuidamos"</p>
        < Image src={'/img/about-us-banner.jpg'} height={6000} width={4000}  layout="responsive" />
      </div>
      <h2></h2>
      <p></p>
      <div className="aboutPage__section"></div>
      <div className="aboutPage__section"></div>
      <div className="aboutPage__section"></div>
    </div>
  )
}

aboutPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}