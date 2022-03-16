export default function checkoutSteps () {
  return (
    <div className="checkout-steps-wrapper">
      <div className="checkout-steps-list">
        <div className="checkout-step">
          <span className="circle">1</span>
          <span className="checkout-step-title">Introducir datos</span>
        </div>
        <div className="checkout-step">
          <span className="circle">2</span>
          <span className="checkout-step-title">Verificar datos</span>
        </div>
        <div className="checkout-step">
          <span className="circle">3</span>
          <span className="checkout-step-title">Pago</span>
        </div>
      </div>
    </div>
  )
}