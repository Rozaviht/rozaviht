import prisma from 'lib/prisma'
import { ReactElement, useState } from 'react'

import type { imageType } from 'services/AppProvider'

import Layout from '@components/Layout'
import ArticlesCategories from '@components/ArticlesCategories'
import ArticlesBoard from '@components/ArticlesBoard'

import RozanewsLogo from '@img/rozanews-logo.svg'


interface rozanewsProps {
  articlesCategoriesData: articleCategorieType[]
}

export type articleType = {
  title: string
  content: string | null
  image: imageType[]
  createdAt: string
}

export type articleCategorieType = {
  name: string
  articles: articleType[]
}

export const dateOptions = { year: 'numeric', month: 'long', day: 'numeric'}

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



export default function rozanews ({ articlesCategoriesData }: rozanewsProps) {
  const [showCategories, setShowCategories] = useState(false)


  const [categorieSelected, setCategorieSelected] = useState<articleCategorieType>(articlesCategoriesData[0])

  return(
    <div className="rozanews">
      <div className="rozanews__hero">
        <div className="rozanews__logo">
          <RozanewsLogo />
        </div>
        <h4>Nunca te quedes desinformado de lo que te importa</h4>
        <div className="rozanews__banner">
        </div>
      </div>
      <div className="rozanewsNav">
        <ArticlesCategories showCategories={showCategories} setShowCategories={setShowCategories} setCategorieSelected={setCategorieSelected} articlesCategoriesData={articlesCategoriesData} />
        <div className="flexrow flexrow--separate">
          <button className="rozanewsNav__bt" onClick={() => setShowCategories(true)}>CATEGORÍAS</button>
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