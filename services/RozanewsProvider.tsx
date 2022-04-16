import { RozanewsContext } from './RozanewsContext'
import type { ReactElement, ReactNode } from 'react'

import { ArticleData } from '@components/ArticlesData'


interface props {
  children: JSX.Element | JSX.Element[] | ReactElement | ReactNode
}

export type articleType = {
  title: string,
  content: string,
  date: string,
  image: string
}


 export default function CheckoutProvider ({ children }: props) {
  
  var article = [] as articleType[]


  return (
    <RozanewsContext.Provider value={{article}}>
      {children}
    </RozanewsContext.Provider>
  )
}