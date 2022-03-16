import { createContext, Dispatch, SetStateAction } from 'react'
import { CartItemType } from './AppProvider'

export type AppContextProps = {
    cartProducts: CartItemType[]
    setCartProducts: Dispatch<SetStateAction<CartItemType[]>>
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)
