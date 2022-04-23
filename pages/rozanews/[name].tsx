import { ReactElement } from "react"

import Layout from "@components/Layout"

import {getAllArticlesUrl} from "../../lib/articles"


export async function getStaticPaths() {
  const paths = getAllArticlesUrl()
  return {
    paths,
    fallback: false
  }
}


export default function articlePage () {
  return (
    <div>
      <h1>{}</h1>
    </div>
  )
}


articlePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}