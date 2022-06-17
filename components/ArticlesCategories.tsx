import type { Dispatch, SetStateAction } from 'react'
import type { articleCategorieType } from '../pages/rozanews'

type ArticlesCategoriesProps = {
  showCategories: boolean,
  setShowCategories: Dispatch<SetStateAction<boolean>>,
  setCategorieSelected: Dispatch<SetStateAction<articleCategorieType>>,
  articlesCategoriesData: articleCategorieType[]
}

export default function ArticlesCategories ({showCategories, setShowCategories, setCategorieSelected, articlesCategoriesData}:ArticlesCategoriesProps) {

  const handleCategorieSelected = (categorie: articleCategorieType) => {
    setCategorieSelected(categorie)
    setShowCategories(false)
  }

  return (
    <div className={showCategories === true ? "articlesCategories drop" : "articlesCategories"}>
      <div className='articlesCategories__bts'>
        {articlesCategoriesData.map((categorie, index) => 
          <button key={index} className='categorie-bt' onClick={() => handleCategorieSelected(categorie)}>{categorie.name}</button>
          )}
      </div>
    </div>
  )
}