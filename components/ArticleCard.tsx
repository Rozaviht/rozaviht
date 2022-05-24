import Link from 'next/link'
import Image from 'next/image'

import type {articleType} from 'pages/rozanews'

import ArrorRigth from '@img/arrow-right.svg'

type ArticleCardProps = {
  article: articleType
}

export default function ArticleCard ({article}:ArticleCardProps) {



  return (
      <div className="articleCard">
        <div className="articleCard__img">
          <Image src={article.image[0].url} height={article.image[0].height!} width={article.image[0].width!} alt={article.image[0].alt} layout="responsive" />
        </div>
        <div className="flexrow flexrow--np flexrow--between" style={{ 'width': '100%' }}>
          <div className="articleCard__category">{article.category.name.toUpperCase()}</div>
          <p style={{ 'opacity': '0.6'}} >{article.createdAt}</p>
        </div>
        <h2>{article.title}</h2>
        <Link href={`/rozanews/${article.title.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[¿?¡!"#()]/g, "").replace(/\s/g, "-").toLowerCase()}`}>
          <div className="articleCard__link">
            <a >LEER</a>
            <ArrorRigth />
          </div>
        </Link>
      </div>
  )
}