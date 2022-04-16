import Image from 'next/image'

import { ReactElement, useState } from 'react'

import Layout from '@components/Layout'
import ArticlesCategories from '@components/ArticlesCategories'
import ArticlesBoard from '@components/ArticlesBoard'

import rozanewsLogo from '@img/rozanews-logo.svg'
import rozadayBanner from '@img/rozaday-banner.jpeg'
import lupaIcon from '@img/lupa-icon.svg'


export type categorieSelectedType = {
  title: string,
  name: string
}

export default function rozanewsPage () {
  const [showCategories, setShowCategories] = useState(false)
  const [categorieSelected, setCategorieSelected] = useState<categorieSelectedType>({} as categorieSelectedType) 


  return(
    <div className="rozanews">
      <div className="rozanews__hero">
        <div className="rozanews__logo">
          <Image src={rozanewsLogo} layout="responsive"/>
        </div>
        <h4>Nunca te quedes desinformado de lo que te importa</h4>
        <div className="rozanews__banner">
          <Image src={rozadayBanner}  height={60} width={100} layout="responsive" priority/>
        </div>
      </div>
      <div className="rozanewsNav">
        <ArticlesCategories showCategories={showCategories} setShowCategories={setShowCategories} setCategorieSelected={setCategorieSelected} />
        <div className="flexrow flexrow--separate">
          <button className="rozanewsNav__bt" onClick={() => setShowCategories(true)}>Categorías</button>
          <button className="rozanewsNav__bt">Últimos agregados</button>
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

rozanewsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}