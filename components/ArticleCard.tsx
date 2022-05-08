import Link from 'next/link'
import Image from 'next/image'

import type {articleType} from 'pages/rozanews'

type ArticleCardProps = {
  article: articleType
}

export default function ArticleCard ({article}:ArticleCardProps) {


  return (
    <div className="articleCard">
      <div className="articleCard__img">
        <Image src={article.image[0].url} height={article.image[0].height!} width={article.image[0].width!} alt={article.image[0].alt} layout="responsive" />
      </div>
      <h2>{article.title}</h2>
      <p style={{ 'opacity': '0.6'}} >{article.createdAt}</p>
      <Link href={`/rozanews/${article.title.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[¿?¡!"#()]/g, "").replace(/\s/g, "-").toLowerCase()}`}><a className="articleCard__link">LEER</a></Link>
    </div>
  )
}