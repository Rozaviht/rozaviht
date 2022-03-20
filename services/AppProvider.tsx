import { useState, useEffect } from 'react'
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
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0)

  useEffect(() => {
    setTotalCartPrice(cartProducts.reduce((ack: number, item) => ack + item.amount * item.price, 0))
  }, [cartProducts])

  return (
    <AppContext.Provider value={{cartProducts, setCartProducts, totalCartPrice, setTotalCartPrice }}>
      {children}
    </AppContext.Provider>
  )
}