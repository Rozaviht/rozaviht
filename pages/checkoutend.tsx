import CheckoutLayout from "@components/CheckoutLayout"
import CheckoutSteps from "@components/CheckoutSteps"
import { ReactElement, useEffect } from "react"
import CheckoutProvider from "services/CheckoutProvider"



export default function CheckoutEndPage () {

  return (
		<div className="checkout-main">	
			<CheckoutSteps stepStatus={"paymentDone"}/>
			<div className="checkout-section">
				<p style={{ 'fontSize': '1rem' }}>Deberías recibir un correo electrónico confirmando la compra realizada y con su factura correspondiente. Revisa en tu correo la bandeja de Spam en caso de no verlo en la bandeja principal.</p>
				<p style={{ 'fontSize': '1rem', 'marginTop': '1rem' }}>Después te enviaremos un correo con tu número de pedido para que le puedas hacer seguimiento. En el propio correo te explicamos como puedes hacer dicho seguimiento.</p>
				<p>De no ser así, ponte en contacto con nosotros, en nuestra página de contacto, para resolverte cualquier incidente.</p>
			</div>
		</div>
	)
}

CheckoutEndPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <CheckoutProvider>
      <CheckoutLayout>
        {page}
      </CheckoutLayout>
    </CheckoutProvider>
  )
}