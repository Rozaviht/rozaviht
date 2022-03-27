import { useState } from 'react'
import { CheckoutContext } from './CheckoutContext'
import type { ReactElement, ReactNode } from 'react'


interface props {
  children: JSX.Element | JSX.Element[] | ReactElement | ReactNode
}

export type checkoutFormDataType = {
  name: string,
  lastname: string,
  email: string,
  phone: string,
  cif: string,
  provincie: string,
  municipie: string,
  postalcode: string,
  street: string,
  streetnumber: string,
  doordetails: string,
  shippingcomments: string
}





 export default function CheckoutProvider ({ children }: props) {
  const [checkoutFormData, setCheckoutFormData] = useState<checkoutFormDataType>({} as checkoutFormDataType)
  const [editingForm, setEditingForm] = useState(false)


  return (
    <CheckoutContext.Provider value={{checkoutFormData, setCheckoutFormData, editingForm, setEditingForm }}>
      {children}
    </CheckoutContext.Provider>
  )
}