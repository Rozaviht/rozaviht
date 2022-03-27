import { useState, useEffect,useContext } from 'react'

import type { ReactElement } from 'react'

import CheckoutProvider from '../services/CheckoutProvider'
import { CheckoutContext } from 'services/CheckoutContext'

import CheckoutSteps from '@components/CheckoutSteps'
import CheckoutVerify from '@components/CheckoutVerify'

import CheckoutLayout from '@components/CheckoutLayout'
import CheckoutForm from '@components/CheckoutForm'



export default function checkoutPage ()  {
  const [orderVerified, setOrderVerified] = useState(false)


  const {checkoutFormData, editingForm} = useContext(CheckoutContext)


  useEffect(() => {
    window.scroll(0, 0)
  },[checkoutFormData, orderVerified])

  return (
    <div className="checkout-main">
      <CheckoutSteps orderVerified={orderVerified} />
      {/* shippingData && Object.keys(shippingData).length === 0 && Object.getPrototypeOf(shippingData) === Object.prototype, means object === undefined */}
      {checkoutFormData && Object.keys(checkoutFormData).length === 0 && Object.getPrototypeOf(checkoutFormData) === Object.prototype || editingForm === true
      ?
        <CheckoutForm />
      : 
        orderVerified === false 
          ?
            <CheckoutVerify setOrderVerified={setOrderVerified}/>

          :
            <div className="checkout-section">
              <h3 className="font-LoraMedium">Revisa tu correo electrónico para confirmar que tienes el pedido y la factura correspondiente.</h3>
            </div>
      }
    </div>
  )
}


checkoutPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <CheckoutProvider>
      <CheckoutLayout>
        {page}
      </CheckoutLayout>
    </CheckoutProvider>
  )
}