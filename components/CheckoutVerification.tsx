import type { shippingDataProps } from "pages/checkout"

import provinciasData from "../lib/data/pronviciasData.json"
import municipiosData from "../lib/data/municipiosData.json"

export type provinciasDataProps = [{
  nombre: string,
  provincia_id: string
}]

export type municipiosDataProps = [{
  nombre: string,
  provincia_id: string,
  municipio_id: string,
  cmun: string,
  dc: string,
}]

export type checkoutVerificationProps = {
  shippingData: shippingDataProps
}

export default function checkoutVerification ({shippingData}:checkoutVerificationProps) {
  return (
    <div className="checkout-section">
      <div>
        <h2>Datos personales</h2>
        <div>
          <p>{shippingData.name}</p>
          <p>{shippingData.lastname}</p>
          <p>{shippingData.mail}</p>
          <p>{shippingData.phone}</p>
        </div>
      </div>
      <div>
        <h2>Dirección de envío</h2>
        <div>
          <p>{provinciasData.filter(provincia =>
            shippingData.provincie === provincia.provincia_id
            ).map(provincia => provincia.nombre)}</p>
          <p>{`${municipiosData.filter(municipio =>
            shippingData.municipie === municipio.municipio_id
            ).map(municipio => municipio.nombre)} ${shippingData.postalcode}`}</p>
          <p>{`${shippingData.street}, ${shippingData.streetnumber}`}</p>
          <p>{shippingData.doordetails}</p>
          <p>{shippingData.shippingcomments}</p>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}