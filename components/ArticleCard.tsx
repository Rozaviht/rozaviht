import Link from 'next/link'
import Image from 'next/image'

import type {articleType} from 'pages/rozanews'

type ArticleCardProps = {
  article: articleType
}

export default function ArticleCard ({article}:ArticleCardProps) {

  return (
      <Link href={`/rozanews/${article.title.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[¿?¡!"#()]/g, "").replace(/\s/g, "-").toLowerCase()}`}>
        <div className="articleCard">
          <div className="flexcolum flexcolum--nopd flexcolum--separate">
            <p style={{ 'fontSize': '22px', 'fontWeight': '700' }}>{article.title}</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard</p>
            <div className="flexrow flexrow--nopd flexrow--algncenter flexrow--separate" style={{ 'width': '100%' }}>
              <div className="articleCard__category">{article.category.name}</div>
              <p style={{ 'opacity': '0.6', 'fontSize': '13px' }} >{article.createdAt}</p>
            </div>

          </div>
          <div className="articleCard__img">
            <Image src={article.image[1].url.slice(article.image[1].url.length - 9) === "16-9.webp" ? article.image[1].url : article.image[0].url} height={article.image[1].url.slice(article.image[1].url.length - 9) === "16-9.webp" ? article.image[1].height! : article.image[0].height!} width={article.image[1].url.slice(article.image[1].url.length - 9) === "16-9.webp" ? article.image[1].width! : article.image[0].width!} alt={article.image[1].alt} layout="responsive" />
          </div>
        </div>
      </Link>
  )
}