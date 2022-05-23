import { createContext, Dispatch, SetStateAction } from 'react'
import { CartItemType } from './AppProvider'

export type AppContextProps = {
    cartProducts: CartItemType[]
    setCartProducts: Dispatch<SetStateAction<CartItemType[]>>
    totalCartPrice: number,
    setTotalCartPrice: Dispatch<SetStateAction<number>>,
    handleRemoveFromCart: (productId: number) => void,
    cookiesManageShow: boolean,
    setCookiesManageShow: Dispatch<SetStateAction<boolean>>,
    showCart: boolean,
    setShowCart: Dispatch<SetStateAction<boolean>>,
    showPopUp: boolean,
    setShowPopUp: Dispatch<SetStateAction<boolean>>,
    popUpMssg: string[]
    setPopUpMssg: Dispatch<SetStateAction<string[]>>,

}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)
