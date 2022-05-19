import { createContext, Dispatch, SetStateAction } from 'react'
import { CheckoutForm, ShippingForm } from './CheckoutProvider'

export type CheckoutContextProps = {
  shippingForm: ShippingForm,
  setShippingForm: Dispatch<SetStateAction<ShippingForm>>,
  billingForm: CheckoutForm,
  SetBillingForm: Dispatch<SetStateAction<CheckoutForm>>,
  editingForm: boolean,
  setEditingForm: Dispatch<SetStateAction<boolean>>
}


export const CheckoutContext = createContext<CheckoutContextProps>({} as CheckoutContextProps)