import React, { useContext, useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"



import { CheckoutContext } from "services/CheckoutContext";

export default function StripeForm() {
  const { setPaymentDone } = useContext(CheckoutContext)

  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState<string | undefined | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent!.status) {
        case "succeeded":
          setMessage("Pago realizado correctamente!")
          break
        case "processing":
          setMessage("Tu pago se esta procesando.")
          break
        case "requires_payment_method":
          setMessage("Tu pago no fue exitoso, intentalo de nuevo.")
          break
        default:
          setMessage("Algo ha ido mal.")
          break
      }
    });
  }, [stripe])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!stripe || !elements) {
      console.log('not loaded')
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/checkout",
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("Ha ocurrido un error inesperado.")
    }

    setPaymentDone(true)
    setIsLoading(false)
  };

  return (
    <form id="payment-form" className="stripeForm" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button className="stripeForm__bt" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}