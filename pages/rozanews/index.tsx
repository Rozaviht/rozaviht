import prisma from 'lib/prisma'
import Image from 'next/image'
import { ReactElement, useState } from 'react'

import type { imageType } from 'services/AppProvider'

import Layout from '@components/Layout'
import ArticlesCategories from '@components/ArticlesCategories'
import ArticlesBoard from '@components/ArticlesBoard'

import RozanewsLogo from 'public/img/rozanews-logo.svg'


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



export default function Rozanews ({ articlesCategoriesData }: rozanewsProps) {
  const [showCategories, setShowCategories] = useState(false)


  const [categorieSelected, setCategorieSelected] = useState<articleCategorieType>(articlesCategoriesData[0])

  return(
    <div className="rozanews">
      <div className="rozanews__hero">
        <div className="bannerBar"></div>
        <div className="img16-9">
          <Image src={"/img/rozanews-banner-16-9.webp"} height={720} width={1280} alt={'hola'} layout="responsive"/>
        </div>
        <div className="img3-1">
          <Image src={"/img/rozanews-banner-3-1.webp"} height={427} width={1280} alt={'hola'} layout="responsive"/>
        </div>
        <RozanewsLogo className="rozanews__logo" />
        <h1>Nunca te quedes desinformado de lo que te importa</h1>
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

Rozanews.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}