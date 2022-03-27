import { createContext, Dispatch, SetStateAction } from 'react'
import { checkoutFormDataType } from './CheckoutProvider'

export type CheckoutContextProps = {
  checkoutFormData: checkoutFormDataType,
  setCheckoutFormData: Dispatch<SetStateAction<checkoutFormDataType>>,
  editingForm: boolean,
  setEditingForm: Dispatch<SetStateAction<boolean>>
}


export const CheckoutContext = createContext<CheckoutContextProps>({} as CheckoutContextProps)