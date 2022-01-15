import { createContext, Dispatch, SetStateAction, useContext} from 'react'
import { CartItemType } from './AppProvider'

export type AppContextProps = {
    cartProducts: CartItemType[]
    setCartProducts: Dispatch<SetStateAction<CartItemType[]>>
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)



/* export function useAppContext() {
  const context = useContext(AppContext)

  if(!context) {
    console.error('Error deploying App Context!!!')
  }

  return context
}

export default useAppContext */