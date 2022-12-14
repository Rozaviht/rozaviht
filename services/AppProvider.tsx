import { useState, useEffect } from 'react'
import { AppContext } from './AppContext'
import type { ReactElement, ReactNode } from 'react'


interface AppProviderProps {
  children: JSX.Element | JSX.Element[] | ReactElement | ReactNode
}

export type imageType = {
  id: string
  url: string
  alt: string
  height: number | null
  width: number | null
}

export type CartItemType = {
  id: number
  name: string
  price: number
  image: imageType
  amount: number
}





 export default function AppProvider ({ children }: AppProviderProps) {
  const [cartProducts, setCartProducts] = useState<CartItemType[]>([])
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0)
  const [showCart, setShowCart] = useState(false)
  const [popUpOpen, setPopUpOpen] = useState(false)
  const [popUpMssg, setPopUpMssg] = useState(["", ""])
  const [popUpImg, setPopUpImg] = useState<imageType>({} as imageType)
  /* This variable is only for now, for testing UI */
  const [cookiesManageShow, setCookiesManageShow] = useState(false)


  useEffect(() => {
    if (window) {
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
    <AppContext.Provider value={{cartProducts, setCartProducts, totalCartPrice, setTotalCartPrice, handleRemoveFromCart, cookiesManageShow, setCookiesManageShow, showCart, setShowCart, popUpOpen, setPopUpOpen, popUpMssg, setPopUpMssg, popUpImg, setPopUpImg }}>
      {children}
    </AppContext.Provider>
  )
}