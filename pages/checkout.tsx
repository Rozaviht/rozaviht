import { useState, useEffect,useContext } from 'react'

import type { ReactElement } from 'react'

import CheckoutProvider from '../services/CheckoutProvider'
import { CheckoutContext } from 'services/CheckoutContext'

import CheckoutSteps from '@components/CheckoutSteps'
import CheckoutVerify from '@components/CheckoutVerify'

import CheckoutLayout from '@components/CheckoutLayout'
import CheckoutForm from '@components/CheckoutForm'
import CheckoutPayment from '@components/CheckoutPayment'



export default function checkoutPage ()  {
  const [orderVerified, setOrderVerified] = useState(false)
  const [paymentDone, setPaymentDone] = useState(false)


  const {shippingForm, editingForm} = useContext(CheckoutContext)


  useEffect(() => {
    window.scroll(0, 0)
  },[shippingForm, orderVerified])

  return (
    <div className="checkout-main">
      <CheckoutSteps orderVerified={orderVerified} />
      {/* shippingData && Object.keys(shippingData).length === 0 && Object.getPrototypeOf(shippingData) === Object.prototype, means object === undefined */}
      {shippingForm && Object.keys(shippingForm).length === 0 && Object.getPrototypeOf(shippingForm) === Object.prototype || editingForm === true
      ?
        <CheckoutForm />
      : 
        orderVerified === false 
          ?
            <CheckoutVerify setOrderVerified={setOrderVerified}/>
          :
            paymentDone === false
            ?
            < CheckoutPayment  setPaymentDone={setPaymentDone}/>
            : 
            <div className="checkout-section">
              <p style={{ 'fontSize': '1rem' }}>Deberías recibir un correo electrónico confirmando la compra realizada y con su factura correspondiente. Revisa en tu correo la bandeja de Spam en caso de no verlo en la bandeja principal.</p>
              <p style={{ 'fontSize': '1rem', 'marginTop': '1rem' }}>Después te enviaremos un correo con tu número de pedido para que le puedas hacer seguimiento. En el propio correo te explicamos como puedes hacer dicho seguimiento.</p>
              <p>De no ser así, ponte en contacto con nosotros, en nuestra página de contacto, para resolverte cualquier incidente.</p>
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