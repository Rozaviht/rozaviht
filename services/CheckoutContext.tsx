import { createContext, Dispatch, SetStateAction } from 'react'
import { BillingForm, ShippingForm } from './CheckoutProvider'

export type CheckoutContextProps = {
  shippingForm: ShippingForm,
  setShippingForm: Dispatch<SetStateAction<ShippingForm>>,
  billingForm: BillingForm,
  setBillingForm: Dispatch<SetStateAction<BillingForm>>,
  editingForm: boolean,
  setEditingForm: Dispatch<SetStateAction<boolean>>
  paymentDone: boolean,
  setPaymentDone: Dispatch<SetStateAction<boolean>>
  orderVerified: boolean,
  setOrderVerified: Dispatch<SetStateAction<boolean>>
}


export const CheckoutContext = createContext<CheckoutContextProps>({} as CheckoutContextProps)