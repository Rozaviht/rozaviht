import { articleType } from "pages/rozanews"
import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard"

interface ArticleCardSliderProps {
  articles: articleType[]
}

export default function ArticleCardSlider ({articles}: ArticleCardSliderProps) {

  const [currentArticle, setCurrentArticle] = useState(0)

  useEffect(() => {
    const articlesInterval = setTimeout(() =>{
      setCurrentArticle(currentArticle => currentArticle === articles.length - 1 ? 0 : currentArticle + 1)
    }, 8000)
    
    return () => clearInterval(articlesInterval)
  }, [currentArticle])
  
  if (!Array.isArray(articles) || articles.length <= 0) {
    return null
  }

  return (
    <div className="">
      {articles.map((article, index) => {
        return (
          <div key={index}>
            {index === currentArticle && (
              <ArticleCard article={article}/>
            )}
          </div>
        )
      })}
    </div>
  )
}