import prisma from 'lib/prisma'
import Image from 'next/image'
import { ReactElement, useState } from 'react'

import type { imageType } from 'services/AppProvider'

import Layout from '@components/Layout'
import ArticlesCategories from '@components/ArticlesCategories'

import RozanewsLogoBlack from 'public/img/rozanews-logo-black.svg'
import ArticleCard from '@components/ArticleCard'


interface rozanewsProps {
  articlesCategoriesData: articleCategorieType[]
}

export type articleType = {
  title: string
  content: string | null
  image: imageType[]
  createdAt: string
  category: {
    name: string
  }
}

export type articleCategorieType = {
  name: string
  articles: articleType[]
}

export const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric'}

export async function getStaticProps() {
  const articlesRawData = await prisma.articles.findMany({
    orderBy: {
      createdAt: 'desc' 
    },
    where: {
      published: true
    },
    select: {
      title: true,
      content: true,
      category: {
        select: {
          name: true
        }
      },
      image: {
        select: {
          id: true,
          url: true,
          alt: true,
          height: true,
          width: true
        }
      },
      createdAt: true,
    }
  })

  const articlesCategoriesRawData = await prisma.article_categories.findMany({
    select: {
      name: true,
      articles: {
        select: {
          title: true,
          content: true,
          category: {
            select: {
              name: true
            }
          },
          image: {
            select: {
              id: true,
              url: true,
              alt: true,
              height: true,
              width: true
            }
          },
          createdAt: true,
        }
      }
    }
  })


  //Changed the Date value to string, to be able to
  //serialized as JSON.j

  

  const articlesData: articleType[] = []
  articlesRawData.forEach( article => articlesData.push({
    ...article,
      createdAt: article.createdAt.toLocaleDateString('es-ES', dateOptions)
  }))


  const articlesCategoriesData: articleCategorieType[] = []
  articlesCategoriesRawData.forEach( categorie => articlesCategoriesData.push({
    ...categorie,
    articles: categorie.articles.map( article => ({
      ...article,
      createdAt: article.createdAt.toLocaleDateString('es-ES', dateOptions)
    }) )
  }))
  articlesCategoriesData.unshift({
    name: 'Ultimos agregados',
    articles: articlesData
  })


  return {
    props: { articlesData, articlesCategoriesData },
    revalidate: 60 * 60 * 24 * 3
  }
}



export default function Rozanews ({ articlesCategoriesData }: rozanewsProps) {
  const [showCategories, setShowCategories] = useState(false)
  const [categorieSelected, setCategorieSelected] = useState<articleCategorieType>(articlesCategoriesData[0])

  const scrollToArticles = () => {
    const articlesBoard = document.getElementById("articlesBoard")!
    articlesBoard.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  return(
    <div className="rozanews">
      <div className="rozanews__hero">
        <div className="bannerBar"></div>
        <div className="rozanews__img__land">
          <Image  src={"https://rozaviht-media.s3.eu-west-3.amazonaws.com/rozanews-banner-16-9.webp"} height={720} width={1280} alt={'Hombre escribiendo en un cuaderno y al lado el aceite de cbd de rozaviht'} layout="responsive"/>
        </div>
        <div className="rozanews__img__port">
          <Image  src={"https://rozaviht-media.s3.eu-west-3.amazonaws.com/rozanews-banner-9-16.webp"} height={1816} width={1022} alt={'Hombre escribiendo en un cuaderno y al lado el aceite de cbd de rozaviht'} layout="responsive"/>
        </div>
        <RozanewsLogoBlack className="rozanews__logo" />
        <h1>Nunca te quedes desinformado de lo que te importa</h1>
        <div className="rozanews__hero__bt">
          <p>Descubre nuestros artículos</p>
          <button className="closeBtSlide closeBtSlide--centerDown" onClick={scrollToArticles}>
            <div className="closeBtSlide__lineT"></div>
            <div className="closeBtSlide__lineC"></div>
            <div className="closeBtSlide__lineB"></div>
        </button>
        </div>
      </div>
      <div id='articlesBoard' className="flexcolum flexcolum--separate flexcolum--around" style={{ 'width': '100%'}}>
        <div className="flexrow flexrow--between" style={{ 'width': '100%'}}>
          <h1>Categoría: {categorieSelected.name}</h1>
          <div className="flexcolum">
            <button className="rozanewsNav__bt" onClick={() => setShowCategories(!showCategories)}>Selecciona la categoría</button>
            <ArticlesCategories showCategories={showCategories} setShowCategories={setShowCategories} setCategorieSelected={setCategorieSelected} articlesCategoriesData={articlesCategoriesData} />
          </div>
        </div>
        <div className="articlesBoard">
          {categorieSelected.articles.map( (article, index) => 
            < ArticleCard key={index} article={article} />
          )}
        </div>
      </div>
    </div>
  )
}

Rozanews.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}