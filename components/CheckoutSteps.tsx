import type { shippingDataProps } from "pages/checkout"

export type checkoutStepsProps = {
  shippingData: shippingDataProps,
  orderVerified: boolean
}


export default function checkoutSteps ({shippingData, orderVerified}:checkoutStepsProps) {

  return (
    <>
      {shippingData && Object.keys(shippingData).length === 0 && Object.getPrototypeOf(shippingData) === Object.prototype 
        ?
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
            <h1 className="checkout-title" >Introduce tus datos de envío</h1>
          </div>
        :
          orderVerified === false 
            ?
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
            
            :
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
                <h1 className="checkout-title" >Verfica que todo esta correcto</h1>
              </div>

      }
    </>
  )
}