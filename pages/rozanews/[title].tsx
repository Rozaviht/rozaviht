import Image from "next/image"
import prisma from "lib/prisma"

import type { ReactElement } from "react"
import type { articleCategorieType, articleType } from "."
import type { GetStaticPaths } from 'next'

import { dateOptions } from "."
import {getAllArticlesUrl} from "../../lib/getAllArticlesUrl"

import Layout from "@components/Layout"
import ArticleCard from "@components/ArticleCard"

import IsotipoBlack from "@img/isotipo-black.svg"
import ArrowLeftNegative from "@img/arrow-left-negative.svg"
import Link from "next/link"



export const getStaticPaths: GetStaticPaths = async () => {
  const { urlsCleaned } = await getAllArticlesUrl()

  const paths = urlsCleaned.map( url => {
    return {
      params: { title: url}
    }
  })

  return {
    paths,
    fallback: "blocking",
  }
}

export async function getStaticProps ({params}: {params: {title:string}}) {

  const {articlesUrl} = await getAllArticlesUrl()

  let articleID:string = ''

  for ( let article of articlesUrl) {
    
    let titleAsUrl = article.title.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[¿?¡!"#()]/g, "").replace(/\s/g, "-").toLowerCase()

    if ( titleAsUrl === params.title) {
      articleID = article.id
    }
  }


  const articlePageData = await prisma.articles.findUnique({
    where: {
      id: articleID
    },
    select: {
      title: true,
      content: true,
      image: true,
      createdAt: true,
      category: {
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
      }
    }
  })

  const articleData = {
    title: articlePageData?.title,
    content: articlePageData?.content,
    image: articlePageData?.image,
    createdAt: articlePageData?.createdAt.toLocaleDateString('es-ES', dateOptions)
  }

  const articleCatagorieData = {
    name: articlePageData?.category.name,
    articles: articlePageData?.category.articles.filter( article => article.title !== articleData.title).map( article => ({
      ...article,
      createdAt: article.createdAt.toLocaleDateString('es-ES', dateOptions)
    }))
  }



  return {
    props: {articleData, articleCatagorieData},
    revalidate: 60 * 60 * 24 * 3
  }
}


interface articlePageProps {
  articleData: articleType,
  articleCatagorieData: articleCategorieType
}

export default function articlePage ({ articleData, articleCatagorieData }: articlePageProps) {

  console.log(articleCatagorieData)

  return (
    <div className="article-page" >
      <div className="article">
        <div className="article__banner">
          < Image src={articleData.image[0].url} height={articleData.image[0].height!} width={articleData.image[0].width!} alt={articleData.image[0].alt} layout="responsive" />
        </div>
        <div className="article__content">
          <h1>{articleData.title}</h1>
          <p>{articleData.createdAt}</p>
          <p>{articleData.content}</p>
          < IsotipoBlack className="isotipo-black" />
        </div>
      </div>
      {articleCatagorieData.articles.length < 1
        ?
        <></>
      :
      <div className="recomendations">
        <div className="flexrow flexrow--between" style={{'width': '90%'}}>
          <h2>Sigue leyendo artículos de la misma categoría:</h2>
          <Link href={"/rozanews"}>
            <a  className="recomendations__bt">
              <ArrowLeftNegative /> O vuelve a atrás a elegir otra
            </a>
          </Link>
        </div>
        <div className="recomendations__articles">
        {articleCatagorieData.articles.map( (article, index) => 
          < ArticleCard article={article} key={index} />
        )}
        </div>
      </div>
      }
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