import { useState, useEffect } from 'react'

import type { ReactElement } from 'react'

import CheckoutSteps from '@components/CheckoutSteps'
import CheckoutVerify from '@components/CheckoutVerify'

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
  const [orderVerified, setOrderVerified] = useState(false)


  useEffect(() => {
    window.scroll(0, 0)
  },[shippingData, orderVerified])

  console.log(shippingData)

  return (
    <div className="checkout-main">
      <CheckoutSteps shippingData={shippingData} orderVerified={orderVerified} />
      {/* shippingData && Object.keys(shippingData).length === 0 && Object.getPrototypeOf(shippingData) === Object.prototype, means object === undefined */}
      {shippingData && Object.keys(shippingData).length === 0 && Object.getPrototypeOf(shippingData) === Object.prototype 
      ?
        <CheckoutForm setShippingData={setShippingData} />
      : 
        orderVerified === false 
          ?
            <CheckoutVerify shippingData={shippingData} setOrderVerified={setOrderVerified}/>

          :
            <div>Pagado</div>
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