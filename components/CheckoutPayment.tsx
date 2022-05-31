import React, { useState, useEffect, useContext } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import StripeForm from "./StripeForm"
import { AppContext } from 'services/AppContext'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPayment() {
  const [clientSecret, setClientSecret] = useState("")
  const [paymentIntent, setPaymentIntent] = useState('')

  const { totalCartPrice } = useContext(AppContext)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads using our local API
    fetch("api/stripe-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        amount: totalCartPrice * 100,
        payment_intent_id: ""
       }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.client_secret), setPaymentIntent(data.id);
      })
  }, []);

  const options = {
    clientSecret,
  };

  return (
    <div className="checkoutPayment">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeForm />
        </Elements>
      )}
    </div>
  );
}