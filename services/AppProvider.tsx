import { useState } from 'react'
import { AppContext } from './AppContext'
import type { ReactElement, ReactNode } from 'react'


interface props {
  children: JSX.Element | JSX.Element[] | ReactElement | ReactNode
}

export type CartItemType = {
  id: number;
  name: string;
  price: number;
/*   image: string; */
  amount: number
}





 export default function AppProvider ({ children }: props) {
  const [cartProducts, setCartProducts] = useState<CartItemType[]>([])

  return (
    <AppContext.Provider value={{cartProducts, setCartProducts }}>
      {children}
    </AppContext.Provider>
  )
}