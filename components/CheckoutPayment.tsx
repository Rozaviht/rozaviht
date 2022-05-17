import { Dispatch, SetStateAction } from "react";

interface CheckoutPaymentProps {
  setPaymentDone: Dispatch<SetStateAction<boolean>>,
}

export default function CheckoutPayment ({setPaymentDone}:CheckoutPaymentProps) {
  return (
    <div className="checkoutPayment">
      <div className="flexcolum flexcolum--separate">
        <h2>Resumen del pedido</h2>
        <div className="flexrow">
          <strong>Cantidad(EUR):</strong>
          <p></p>
        </div>
      </div>
      <div className="flexcolum flexcolum--separate">
          <label htmlFor="cardNumber">
            <span>Número de tarjeta</span>
            <input type="number" name="cardNumber" />
          </label>
        <div className="flexrow">
          <label htmlFor="expDate">
            <span>Número de tarjeta</span>
            <input type="number" name="expDate" />
          </label>
          <label htmlFor="cardScrtNumber">
            <span>Número de tarjeta</span>
            <input type="number" name="cardScrtNumber" />
          </label>
        </div>
      </div>
    </div>
  )
}