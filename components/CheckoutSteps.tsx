import { useContext } from 'react'
import  { CheckoutContext } from '../services/CheckoutContext'  

export type checkoutStepsProps = {
  orderVerified: boolean
}


export default function checkoutSteps ({ orderVerified}:checkoutStepsProps) {

  const {checkoutFormData, editingForm} = useContext(CheckoutContext)

  return (
    <>
      {checkoutFormData && Object.keys(checkoutFormData).length === 0 && Object.getPrototypeOf(checkoutFormData) === Object.prototype || editingForm === true
        ?/*   ---- FIRST STEP: FORM ------   */
          <div className="checkout-steps-wrapper">
            <div className="checkout-steps-list">
              <div className="checkout-step current">
                <span className="circle">1</span>
                <span className="checkout-step-title">Introducir datos</span>
              </div>
              <div className="checkout-step ">
                <span className="circle">2</span>
                <span className="checkout-step-title">Verificar compra</span>
              </div>
              <div className="checkout-step">
                <span className="circle">3</span>
                <span className="checkout-step-title">Pago</span>
              </div>
            </div>
            <h1 className="checkout-title" >Introduce tus datos de entrega</h1>
          </div>
        :
          orderVerified === false 
            ?/*   ---- SECOND STEP: VERIFY FORM ------   */
              <div className="checkout-steps-wrapper">
                <div className="checkout-steps-list">
                  <div className="checkout-step done">
                    <span className="circle">✓</span>
                    <span className="checkout-step-title">Introducir datos</span>
                  </div>
                  <div className="checkout-step current">
                    <span className="circle">2</span>
                    <span className="checkout-step-title">Verificar compra</span>
                  </div>
                  <div className="checkout-step">
                    <span className="circle">3</span>
                    <span className="checkout-step-title">Pago</span>
                  </div>
                </div>
                <h1 className="checkout-title" >Verfica que todo esta correcto</h1>
              </div>
            
            :/*   ---- THIRD STEP: PAY ------   */
              <div className="checkout-steps-wrapper">
                <div className="checkout-steps-list">
                  <div className="checkout-step done">
                    <span className="circle">✓</span>
                    <span className="checkout-step-title">Introducir datos</span>
                  </div>
                  <div className="checkout-step done">
                    <span className="circle">✓</span>
                    <span className="checkout-step-title">Verificar compra</span>
                  </div>
                  <div className="checkout-step done">
                    <span className="circle">✓</span>
                    <span className="checkout-step-title">Pago</span>
                  </div>
                </div>
                <h1 className="checkout-title" >Muchas gracias por la compra, tu pedido se ha realizado con exito.</h1>
              </div>

      }
    </>
  )
}