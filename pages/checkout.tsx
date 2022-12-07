import { useEffect,useContext } from 'react'

import type { ReactElement } from 'react'

import CheckoutProvider from '../services/CheckoutProvider'
import { CheckoutContext } from 'services/CheckoutContext'

import CheckoutSteps from '@components/CheckoutSteps'
import CheckoutVerify from '@components/CheckoutVerify'

import CheckoutLayout from '@components/CheckoutLayout'
import CheckoutForm from '@components/CheckoutForm'



export default function CheckoutPage ()  {
  const {shippingForm, editingForm, orderVerified} = useContext(CheckoutContext)


  useEffect(() => {
    window.scroll(0, 0)
  },[shippingForm, orderVerified])

  return (
    <div className="checkout-main">
      
      {/* shippingData && Object.keys(shippingData).length === 0 && Object.getPrototypeOf(shippingData) === Object.prototype, means object === undefined */}
      {shippingForm && Object.keys(shippingForm).length === 0 && Object.getPrototypeOf(shippingForm) === Object.prototype || editingForm === true
      ?
        <>
          <CheckoutSteps  stepStatus={"shippingForm"}/>
          <CheckoutForm />
        </>
      : 
        orderVerified === false 
          ?
            <>
              <CheckoutSteps  stepStatus={"orderVerified"}/>
              <CheckoutVerify />
            </>
          :
            <></>
      }
    </div>
  )
}


CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <CheckoutProvider>
      <CheckoutLayout>
        {page}
      </CheckoutLayout>
    </CheckoutProvider>
  )
}