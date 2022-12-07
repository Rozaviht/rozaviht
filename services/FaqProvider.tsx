import { ReactElement, ReactNode, useState } from "react";

import { FaqContext } from './FaqContext' 

interface FaqProviderProps {
  children: JSX.Element | JSX.Element[] | ReactElement | ReactNode
}

export default function FaqProvider ({children}: FaqProviderProps) {
  const [faqTitles, setFaqTitles] = useState<string[]>([] as string[])

  return (
    <FaqContext.Provider value={{faqTitles, setFaqTitles}}>
      {children}
    </FaqContext.Provider>
  )
}