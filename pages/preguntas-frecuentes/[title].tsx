import FaqCuestionsLayout from "@components/FaqCuestionsLayout"
import Layout from "@components/Layout"
import prisma from "lib/prisma"
import { GetStaticPaths } from "next/types"
import { ReactElement, useContext, useEffect, useState } from "react"
import { FaqContext } from "services/FaqContext"
import FaqProvider from "services/FaqProvider"
import type { faqCategory } from "."


interface faqCategoryProps {
  faqCategory: faqCategory
  faqCategoriesTitles: [{
    title: string
  }]
}

export const getStaticPaths: GetStaticPaths = async () => {

  const faqTitles = await prisma.faq_category.findMany({
    select: {
      title: true
    }
  })

  const paths = faqTitles.map( title => {
    return {
      params: { title: title.title.toLowerCase()}
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({params}: {params: {title:string}}) => {

  const faqCategory = await prisma.faq_category.findUnique({
    where: {
      title: params.title.toUpperCase()
    },
    select: {
      title: true,
      themeCuestions: {
        select: {
          cuestion: true,
          content: true
        }
      }
    }
  })

  const faqCategoriesTitles = await prisma.faq_category.findMany({
    select: {
      title: true
    }
  })
  return {
    props: {faqCategory, faqCategoriesTitles}
  }
}

export default function FaqCategoryPage ({faqCategory, faqCategoriesTitles}:faqCategoryProps) {

  const {setFaqTitles,faqTitles} = useContext(FaqContext)

  useEffect(() => {
    setFaqTitles(faqCategoriesTitles.map( category => {return category.title}))
}, [])

  const [dropFaqCuestion, setDropFaqCuestion] = useState(faqCategory.themeCuestions.map( cuestion => {return false}))

  const handleDropCuestion = (index:number) => {
    let faqCuestionCopy = [...dropFaqCuestion]
    faqCuestionCopy[index] = !dropFaqCuestion[index]
    setDropFaqCuestion(faqCuestionCopy)
  }

  return (
    <div className="faqCategoryPage">
      <h1>{faqCategory.title}</h1>
      <div className="flexcolum flexcolum--around flexcolum--separate" style={{ 'width': '100%' }} >
        {faqCategory.themeCuestions.map( (cuestion, index) => 
          <div key={index} className={dropFaqCuestion[index] === false ? "faq-cuestion" : "faq-cuestion dropped"}>
            <h3 onClick={() => handleDropCuestion(index)} >{cuestion.cuestion}</h3>
            <p>{cuestion.content}</p>
          </div>
        )}
      </div>
    </div>
  )
}

FaqCategoryPage.getLayout = function getLayout(page: ReactElement) {



  return (
    <Layout>
      <FaqProvider>
        <FaqCuestionsLayout>
          {page}
        </FaqCuestionsLayout>
      </FaqProvider>
    </Layout>
  )
}