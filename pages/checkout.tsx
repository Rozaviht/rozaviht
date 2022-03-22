import { useState, useEffect } from 'react'

import type { ReactElement } from 'react'

import CheckoutSteps from '@components/CheckoutSteps'
import CheckoutVerify from '@components/CheckoutVerify'

import CheckoutLayout from '@components/CheckoutLayout'
import CheckoutForm from '@components/CheckoutForm'

export type shippingDataProps = {
  name: string,
  lastname: string,
  email: string,
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
            <div className="checkout-section">
              <h2 className="font-LoraMedium">Muchas gracias por la compra, tu pedido se ha realizado con exito.</h2>
              <h3 className="font-LoraMedium">Revisa tu correo electrónico para confirmar que tienes el pedido y la factura correspondiente.</h3>
            </div>
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