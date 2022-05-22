import Link from "next/link"
import { useContext } from "react"
import { FaqContext } from "services/FaqContext"

interface FaqCuestionsLayoutProps {
  children?: React.ReactNode,
}

export default function FaqCuestionsLayout ({children}:FaqCuestionsLayoutProps) {

  const { faqTitles } = useContext(FaqContext)


  return (
    <div className="faqLayout">
      <div className="faqCategory-menu">
        <h2>Categorias</h2>
        {faqTitles!.map( (faqTitle, index) =>
          <Link key={index} href={`/preguntas-frecuentes/${faqTitle.toLowerCase()}`}>
            <a >{faqTitle}</a>
          </Link>
        )}
      </div>
      {children}
    </div>
  )
}