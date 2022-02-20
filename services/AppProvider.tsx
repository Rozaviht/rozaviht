import { useState } from 'react'
import { AppContext } from './AppContext'


interface props {
  children: JSX.Element | JSX.Element[]
  
}

export type CartItemType = {
  id: number;
  name: string;
  price: number;
/*   image: string; */
  amount: number
}





 const AppProvider = ({ children }: props) => {
  const [cartProducts, setCartProducts] = useState<CartItemType[]>([])

  return (
    <AppContext.Provider value={{cartProducts, setCartProducts }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider