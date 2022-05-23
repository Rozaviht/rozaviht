import Image from 'next/image'

import FAQCard from "@components/FAQCard"
import Layout from "@components/Layout"
import prisma from "lib/prisma"

import { ReactElement } from "react"
import FaqProvider from "services/FaqProvider"

interface FAQPageProps {
  faqCategories: faqCategory[]
}

export type faqCategory = {
  title: string
  icon: string
  themeCuestions: faqCuestion[]
}

export type faqCuestion = {
  cuestion: string
  content: string
}

export const getStaticProps = async () => {
  const faqCategories = await prisma.faq_category.findMany({
    select: {
      title: true,
      icon: true,
      themeCuestions: {
        select: {
          cuestion: true,
          content: true
        }
      }
    }
  })



  return {
    props: {faqCategories},
  }
}



export default function FAQPage ({faqCategories}:FAQPageProps) {


  return (
    <div className="faqPage">
      <h1>Preguntas Frecuentes</h1>
        <h3>En esta página encontrarás las preguntas frecuentes que podrían hacerse nuestros clientes, con sus respectivas soluciones.</h3>
        <h3>Si aún trás haber visto las posibles preguntas sigues teniendo alguna duda, consultarnos a través de nuestra página de contacto, rellenenando el formulario.</h3>
        <div className="backgroundBar"></div>
        <div className="faqPage__cuestions">
          {faqCategories.map( (faqCategory, index) => 
            < FAQCard faqCategory={faqCategory} key={index}  />
          )}
        </div>
    </div>
  )
}


FAQPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <FaqProvider>
        {page}
      </FaqProvider>
    </Layout>
  )
}