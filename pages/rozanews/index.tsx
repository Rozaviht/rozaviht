import Image from 'next/image'

import { ReactElement, useState } from 'react'

import Layout from '@components/Layout'
import ArticlesCategories from '@components/ArticlesCategories'
import ArticlesBoard from '@components/ArticlesBoard'

import rozanewsLogo from '@img/rozanews-logo.svg'
import lupaIcon from '@img/lupa-icon.svg'
import prisma from '../../lib/prisma'


export type categorieSelectedType = {
  title: string,
  name: string
}

export const getStaticProps  = async () => {
  const articlesData = await prisma.article.findMany({
    select: {
      title: true,
      mainImageId:
    }
  })
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
          <Image src={"https://rozaviht-media.s3.eu-west-3.amazonaws.com/rozanews-logo.svg"} layout="responsive" />
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
        <div className="searchField">
          <label htmlFor="searchArticles" className="searchField__label" >
            <input className="searchField__input" type="search" placeholder=" " autoComplete="off" id="searchArticles" name="searchArticles" />
            <span className="searchField__placeholder" >Busca el árticulo que desees...</span>
            <button type="submit" className="searchField__button">
                <Image src={lupaIcon} layout="responsive"/>
            </button>
          </label>
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