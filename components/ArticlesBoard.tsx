import type { articleCategorieType } from 'pages/rozanews'

import ArticleCard from './ArticleCard'


type ArticlesBoardProps = {
  categorieSelected: articleCategorieType
}

export default function ArticlesBoard ({categorieSelected}: ArticlesBoardProps) {

  return (
    <div className="flexcolum flexcolum--separate flexcolum--around" style={{ 'width': '100%'}}>
      <h1>Categoría: {categorieSelected.name}</h1>
      <div className="articlesBoard">
        {categorieSelected.articles.map( (article, index) => 
          < ArticleCard key={index} article={article} />
        )}
      </div>
    </div>
  )
}