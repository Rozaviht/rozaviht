 export default function CheckoutSteps ({stepStatus}: {stepStatus: string}) {

  switch (stepStatus) {
    case "shippingForm":
      return  (
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
        )
      break
    case "orderVerified":
      return  (
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
      )
      break
    case "paymentDone":
      return  (
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
      )
      break
    default:
      return(
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
      )

  }
}