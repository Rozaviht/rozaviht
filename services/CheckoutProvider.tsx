import { useState } from 'react'
import { CheckoutContext } from './CheckoutContext'
import type { ReactElement, ReactNode } from 'react'


interface props {
  children: JSX.Element | JSX.Element[] | ReactElement | ReactNode
}

export type CheckoutForm = {
  name: string,
  lastName: string,
  email: string,
  phone: string,
  provincie: string,
  city: string,
  postalcode: string,
  address: string,
  addressNumber: string,
  door: string,
}

export type ShippingForm = CheckoutForm & {  shippingComment: string }





 export default function CheckoutProvider ({ children }: props) {
  const [shippingForm, setShippingForm] = useState<ShippingForm>({} as ShippingForm)
  const [billingForm, SetBillingForm] = useState<CheckoutForm>({} as CheckoutForm)
  const [editingForm, setEditingForm] = useState(false)
  const [paymentDone, setPaymentDone] = useState(false)
  const [orderVerified, setOrderVerified] = useState(false)


  return (
    <CheckoutContext.Provider value={{shippingForm, setShippingForm, billingForm, SetBillingForm, editingForm, setEditingForm,paymentDone, setPaymentDone, orderVerified, setOrderVerified }}>
      {children}
    </CheckoutContext.Provider>
  )
}