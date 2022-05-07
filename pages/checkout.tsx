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
              <p style={{ 'fontSize': '1rem' }}>Deberías recibir un correo electrónico confirmando la compra realizada y con su factura correspondiente. Revisa en tu correo la bandeja de Spam en caso de no verlo en la bandeja principal.</p>
              <p style={{ 'fontSize': '1rem' }}>Después te enviaremos un correo con tu número de pedido para que le puedas hacer seguimiento. En el propio correo te explicamos como puedes hacer dicho seguimiento.</p>
              <p>De no ser así, ponte en contacto con nosotros, en nuestra página de contacto, para resolverte el incidente.</p>
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