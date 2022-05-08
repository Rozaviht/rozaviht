import Layout from "@components/Layout"
import prisma from "lib/prisma"
import { GetStaticPaths } from "next/types"
import type { ReactElement } from "react"
import type { faqCategory } from "."


interface faqCategoryProps {
  faqCategory: faqCategory
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
  return {
    props: {faqCategory}
  }
}

export default function faqCategoryPage ({faqCategory}:faqCategoryProps) {
  return (
    <div className="flexcolum flexcolum--around flexcolum--separate">
      <h1>{faqCategory.title}</h1>
      <div className="flexcolum flexcolum--around flexcolum--separate">
        {faqCategory.themeCuestions.map( cuestion => 
          <div className="faq-cuestion">
            <h3>{cuestion.cuestion}</h3>
            <p>{cuestion.content}</p>
          </div>
        )}
      </div>
    </div>
  )
}

faqCategoryPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}