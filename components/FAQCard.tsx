import Link from "next/link"
import { faqCategory } from "pages/preguntas-frecuentes"

interface faqCardProps {
  faqCategory: faqCategory
}

export default function FAQCard ({faqCategory}:faqCardProps) {

  return (
    <div className="faqCard">
      <div className="faqCard__icon"><img src={faqCategory.icon} alt="" /></div>
      <h2>{faqCategory.title}</h2>
      {faqCategory.themeCuestions.slice(0 , 2).map( (cuestion, index) => 
        < Link href={`/preguntas-frecuentes/${faqCategory.title.toLowerCase()}`} key={index}>
          <a>{cuestion.cuestion}</a>
        </Link>
      )}
      < Link href={`/preguntas-frecuentes/${faqCategory.title.toLowerCase()}`}>
        <a style={{ 'textDecoration': 'underline' }}>Ver más</a>
      </Link>
    </div>
  )
}