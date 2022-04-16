
import ArticleCard from './ArticleCard'

import {ArticleData} from './ArticlesData'

import type {categorieSelectedType} from '../pages/rozanews'

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
  console.log(categorieSelected)
  return (
    <div className="flexcolum flexcolum--separate flexcolum--around">
      <h1>{categorieSelected.title}</h1>
      {ArticleData.filter(article => 
        article.categorie === categorieSelected.name
      ).map(article => 
        <ArticleCard
          key={article.id}
          article={article}
        />
      )}
    </div>
  )
}