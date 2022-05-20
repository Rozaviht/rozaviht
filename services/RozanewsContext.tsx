import { createContext, Dispatch, SetStateAction } from 'react'
import { articleType } from './RozanewsProvider'

export type RozanewsContextProps = {
  article: articleType
}


export const RozanewsContext = createContext<RozanewsContextProps>({} as RozanewsContextProps)