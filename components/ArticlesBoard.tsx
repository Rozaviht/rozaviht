import ArticleCard from './ArticleCard'
import Pagination from './Pagination'

import {ArticleData} from './ArticlesData'

import type {categorieSelectedType} from '../pages/rozanews'
import { useState } from 'react'

type ArticlesBoardProps = {
  categorieSelected: categorieSelectedType
}

export type articleType = {
  id: string,
  title: string,
  image: string,
  date: string,
  categorie: string,
  content: string
}

export default function ArticlesBoard ({categorieSelected}: ArticlesBoardProps) {
  const [currentArticlesBoard, setCurrentArticlesBoard] = useState(1)
  
  const articlesPerPage = 6

  const [articleListSorted, setArticleListSorted] = useState(ArticleData.slice().sort((article1, article2) => Date.parse(article1.date) - Date.parse(article2.date)))


  const indexOfLastPost = currentArticlesBoard *  articlesPerPage
  const indexOfFirstPost = indexOfLastPost - articlesPerPage
  const currentArticles = ArticleData.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => {
    setCurrentArticlesBoard(pageNumber)
    window.scrollTo({
      top: 500,
      behavior: "smooth"
    })
  }

  var name = "¿Miguel& angel& serrano?"
  console.log(name.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s/g, "-"))



  return (
    <div className="flexcolum flexcolum--separate flexcolum--around">
      <h1>{categorieSelected.title}</h1>
      {
        categorieSelected.name === "orderListDate"
        ?
        <>
          {articleListSorted.map(article => 
            <ArticleCard
              key={article.id}
              article={article}
            />
          )}
        </>
        :
        <>
          {currentArticles.filter(article => 
            article.categorie === categorieSelected.name
          ).map(article => 
            <ArticleCard
              key={article.id}
              article={article}
            />
          )}
        </>
      }
      <Pagination 
        articlesPerPage={articlesPerPage}
        totalArticles={ArticleData.length}
        paginate={paginate}
        currentArticlesBoard={currentArticlesBoard}
      />
    </div>
  )
}