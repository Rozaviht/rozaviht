import { createContext, Dispatch, SetStateAction } from 'react'
import { CartItemType } from './AppProvider'

export type AppContextProps = {
    cartProducts: CartItemType[]
    setCartProducts: Dispatch<SetStateAction<CartItemType[]>>
    totalCartPrice: number,
    setTotalCartPrice: Dispatch<SetStateAction<number>>,
    handleRemoveFromCart: (productId: number) => void,
    cookiesManageShow: boolean,
    setCookiesManageShow: Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)
