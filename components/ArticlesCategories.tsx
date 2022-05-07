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
    <div className={showCategories === true ? "articlesCategories" : "articlesCategories hidden"}>

        <h4  style={{ 'margin': '1rem' }}>Elige la categoría que desees:</h4>
        <button className="closeBt closeBt--topRight" onClick={() => setShowCategories(false)}>
          <div className="closeBt__lineL"></div>
          <div className="closeBt__lineR"></div>
        </button>
      <div className='articlesCategories__bts'>
        {articlesCategoriesData.map((categorie, index) => 
          <button key={index} className='categorie-bt' onClick={() => handleCategorieSelected(categorie)}>{categorie.name}</button>
          )}
      </div>
    </div>
  )
}