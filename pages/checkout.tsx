import { useState, useEffect } from 'react'

import type { ReactElement } from 'react'

import CheckoutSteps from '@components/CheckoutSteps'
import CheckoutVerification from '@components/CheckoutVerification'

import CheckoutLayout from '@components/CheckoutLayout'
import CheckoutForm from '@components/CheckoutForm'

export type shippingDataProps = {
  name: string,
  lastname: string,
  mail: string,
  phone: string,
  provincie: string,
  municipie: string,
  postalcode: string,
  street: string,
  streetnumber: string,
  doordetails: string,
  shippingcomments: string
}



export default function checkoutPage ()  {
  const [shippingData, setShippingData] = useState<shippingDataProps>({} as shippingDataProps)


  useEffect(() => {
    window.scroll(0, 0)
  },[shippingData])

  console.log(shippingData)

  return (
    <div className="checkout-main">
      <CheckoutSteps shippingData={shippingData} />
      {/* shippingData && Object.keys(shippingData).length === 0 && Object.getPrototypeOf(shippingData) === Object.prototype, means object === undefined */}
      {shippingData && Object.keys(shippingData).length === 0 && Object.getPrototypeOf(shippingData) === Object.prototype 
      ?
        <CheckoutForm setShippingData={setShippingData} />
      : 
        <CheckoutVerification shippingData={shippingData} />
      }
    </div>
  )
}


checkoutPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <CheckoutLayout>
      {page}
    </CheckoutLayout>
  )
}