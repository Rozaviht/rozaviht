import { createContext, Dispatch, SetStateAction } from "react";

interface FaqContextProps {
  faqTitles: string[] | undefined
  setFaqTitles: Dispatch<SetStateAction<string[]>> ,
}

export const FaqContext = createContext<FaqContextProps>({} as FaqContextProps)