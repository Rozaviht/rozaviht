import Link from 'next/link'
import Image from 'next/image'

import type {articleType} from './ArticlesBoard'

type ArticleCardProps = {
  article: articleType
}

export default function ArticleCard ({article}:ArticleCardProps) {
  return (
    <div className="articleCard">
      <div className="articleCard__img">
        <Image src={article.image} height={100} width={200} layout="responsive" />
      </div>
      <h2>{article.title}</h2>
      <p>{article.date}</p>
      <Link href={"/rozanews"}><a>LEER</a></Link>
    </div>
  )
}