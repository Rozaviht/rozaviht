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

export type BillingForm = CheckoutForm & {cif: string}



 export default function CheckoutProvider ({ children }: props) {
  const [shippingForm, setShippingForm] = useState<ShippingForm>({} as ShippingForm)
  const [billingForm, setBillingForm] = useState<BillingForm>({} as BillingForm)
  const [editingForm, setEditingForm] = useState(false)
  const [paymentDone, setPaymentDone] = useState(false)
  const [orderVerified, setOrderVerified] = useState(false)


  return (
    <CheckoutContext.Provider value={{shippingForm, setShippingForm, billingForm, setBillingForm, editingForm, setEditingForm,paymentDone, setPaymentDone, orderVerified, setOrderVerified }}>
      {children}
    </CheckoutContext.Provider>
  )
}