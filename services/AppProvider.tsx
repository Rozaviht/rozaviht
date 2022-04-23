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
  image: string;
  amount: number
}





 export default function AppProvider ({ children }: props) {
  const [cartProducts, setCartProducts] = useState<CartItemType[]>([])
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0)
  /* This variable is only for now, for testing UI */
  const [cookiesManageShow, setCookiesManageShow] = useState(false)

  useEffect(() => {
    if (window) {
      console.log(cartProducts)
      setCartProducts(JSON.parse(window.sessionStorage.getItem('cartProducts') || '[]') || [] as CartItemType[])
    }
  }, [])

  useEffect(() => {
    window.sessionStorage.setItem( 'cartProducts', JSON.stringify(cartProducts))
    setTotalCartPrice(cartProducts.reduce((ack: number, item) => ack + item.amount * item.price, 0))
  }, [cartProducts])

  const handleRemoveFromCart = (productId: number) => {
    let elementProduct = cartProducts.find(element => element.id === productId)
    setCartProducts(() =>
      cartProducts.filter(function(element) {
        return element !== elementProduct
      })
    );
  };

  return (
    <AppContext.Provider value={{cartProducts, setCartProducts, totalCartPrice, setTotalCartPrice, handleRemoveFromCart, cookiesManageShow, setCookiesManageShow }}>
      {children}
    </AppContext.Provider>
  )
}