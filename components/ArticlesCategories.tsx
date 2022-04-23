import type { Dispatch, SetStateAction } from 'react'
import type {categorieSelectedType} from '../pages/rozanews'

type ArticlesCategoriesProps = {
  showCategories: boolean,
  setShowCategories: Dispatch<SetStateAction<boolean>>,
  setCategorieSelected: Dispatch<SetStateAction<categorieSelectedType>>
}

export default function ArticlesCategories ({showCategories, setShowCategories, setCategorieSelected}:ArticlesCategoriesProps) {

  const ArticlesCategoriesData = ["CBD", "reciclaje", "medioambiente"]

  const handleCategorieSelected = (categorie: string) => {
    setCategorieSelected({
      title: `Categoría seleccionada: ${categorie}`,
      name: categorie
    })
    setShowCategories(false)
  }

  return (
    <div className={showCategories === true ? "articlesCategories showed" : "articlesCategories"}>
      <button className="closeBt closeBt--topRight" onClick={() => setShowCategories(false)}>
        <div className="closeBt__lineL"></div>
        <div className="closeBt__lineR"></div>
      </button>
      {ArticlesCategoriesData.map(categorie => 
        <button key={categorie+1} onClick={() => handleCategorieSelected(categorie)}>{categorie}</button>
        )}
    </div>
  )
}