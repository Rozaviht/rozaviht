import prisma from "./prisma"


export async function getAllArticlesUrl  () {
  const articlesUrl = await prisma.articles.findMany({
    where: {
      published: true
    },
    select: {
      title: true,
      id: true
    }
  })

  const urlsCleaned = articlesUrl.map( article => {
    return `${article.title.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[¿?¡!"#()]/g, "").replace(/\s/g, "-").toLowerCase()}`
    
  })


  return {urlsCleaned, articlesUrl}
}
