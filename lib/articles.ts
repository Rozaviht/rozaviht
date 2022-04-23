import type { articleType } from "@components/ArticlesBoard"

export async function getAllArticlesUrl  () {
  const res = await fetch('http://localhost:3004/articles')
  const articlesData:articleType[]  = await res.json()

  return articlesData.map(article => {
    return {
      params: {name: `${article.id}-${article.title.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[¿?¡!"#()]/g, "").replace(/\s/g, "-").toLowerCase()}` }
    }
  })
}