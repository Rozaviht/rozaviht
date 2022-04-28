import Image from 'next/image'

import { ReactElement, useState } from 'react'

import Layout from '@components/Layout'
import ArticlesCategories from '@components/ArticlesCategories'
import ArticlesBoard from '@components/ArticlesBoard'

import rozanewsLogo from '@img/rozanews-logo.svg'


export type categorieSelectedType = {
  title: string,
  name: string
}


export default function rozanews () {
  const [showCategories, setShowCategories] = useState(false)
  const [categorieSelected, setCategorieSelected] = useState<categorieSelectedType>({
    title: "Últimos artículos agregados",
    name: "orderListDate"
  } as categorieSelectedType) 


  return(
    <div className="rozanews">
      <div className="rozanews__hero">
        <div className="rozanews__logo">
          <Image src={rozanewsLogo} layout="responsive" />
        </div>
        <h4>Nunca te quedes desinformado de lo que te importa</h4>
        <div className="rozanews__banner">
        </div>
      </div>
      <div className="rozanewsNav">
        <ArticlesCategories showCategories={showCategories} setShowCategories={setShowCategories} setCategorieSelected={setCategorieSelected} />
        <div className="flexrow flexrow--separate">
          <button className="rozanewsNav__bt" onClick={() => setShowCategories(true)}>Categorías</button>
          <button className="rozanewsNav__bt" onClick={() => setCategorieSelected({
            title: "Últimos artículos agregados",
            name: "orderListDate"
          })}>Últimos agregados</button>
        </div>
      </div>
      <ArticlesBoard categorieSelected={categorieSelected}/>
    </div>
  )
}

rozanews.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}