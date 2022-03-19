import { useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'
import type { shippingDataProps } from 'pages/checkout'

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

export type checkoutFormProps = {
  setShippingData: Dispatch<SetStateAction<shippingDataProps>>
}

export default function checkoutForm ({setShippingData}:checkoutFormProps) {
  const [currentMunicipio, setCurrentMunicipio] = useState("")
  const [currentProvincia, setCurrentProvincia] = useState("")



  const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur()
  
    // Prevent the page/container scrolling
    e.stopPropagation()
  
    // Refocus immediately, on the next tick (after the current function is done)
    setTimeout(() => {
      e.target.focus()
    }, 0)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = {
      name: event.target.name.value,
      lastname: event.target.lastname.value,
      mail: event.target.mail.value,
      phone: event.target.phone.value,
      provincie: event.target.provincie.value,
      municipie: event.target.municipie.value,
      postalcode: event.target.postalcode.value,
      street: event.target.street.value,
      streetnumber: event.target.streetnumber.value,
      doordetails: event.target.doordetails.value,
      shippingcomments: event.target.shippingcomments.value
    }

    setShippingData(formData)

  }



  return (
    <form className="checkout-section" method="post" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="name" className="checkout-label" >
            <input type="text" className="checkout-input" autoComplete="off" required id="name" name="name" />
            <span className="checkout-labelcontent">Nombre</span>
          </label>
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastname" className="checkout-label">
            <input type="text" className="checkout-input" autoComplete="off" required id="lastname" name="lastname" />
            <span className="checkout-labelcontent">Apellidos</span>
          </label>
        </div>
        <div className="input-wrapper">
          <label htmlFor="mail" className="checkout-label">
            <input type="email" className="checkout-input" autoComplete="off" required id="mail" name="mail" />
            <span className="checkout-labelcontent">Email</span>
          </label>
          <span className="note-span">*Este correo solo se usará para ennviarte la confirmación de compra con la correspondiente factura.</span>
        </div>
        <div className="input-wrapper">
          <label htmlFor="phone" className="checkout-label">
            <input type="number" className="checkout-input" autoComplete="off" required onWheelCapture={numberInputOnWheelPreventChange} id="phone" name="phone" min={100000000} max={999999999} />
            <span className="checkout-labelcontent">Teléfono</span>
          </label>
        </div>
        <div className="select-wrapper">
          <select className="checkout-select" name="provincie" id="selProvincias" placeholder="Provincia" defaultValue={"0"} onChange={e => setCurrentProvincia(e.target.value)}>
            <option hidden >Provincia</option>
            {provinciasData.map(provincia => (
              <option className="checkout-option" key={"provincia"+provincia.provincia_id} value={provincia.provincia_id} >{provincia.nombre}</option>
            ))}
          </select>
        </div>
        <div className="select-wrapper">
          <select className="checkout-select" name="municipie" id="selMunicipios" placeholder="Localidad" defaultValue={"0"} onChange={e => setCurrentMunicipio(e.target.value)}>
            <option hidden >Localidad</option>
              {municipiosData.filter(municipio =>
                municipio.provincia_id === currentProvincia
              ).map(municipio => (
                <option key={"municipio"+municipio.municipio_id} value={municipio.municipio_id} >{municipio.nombre}</option>
              ))}
          </select>
        </div>
        <div className="input-wrapper">
          <label htmlFor="postalcode" className="checkout-label">
            <input type="text" defaultValue={currentMunicipio} className="checkout-input" autoComplete="off" required id="postalcode" name="postalcode"/>
            <span className="checkout-labelcontent">Código Postal</span>
          </label>
        </div>
        <div className="input-wrapper input-wrapper--multiple">
          <label htmlFor="" className="checkout-label checkout-label--short">
            <input type="text" className="checkout-input checkout-input--short" autoComplete="off" required name="street" />
            <span className="checkout-labelcontent">Calle</span>
          </label>
          <label htmlFor="" className="checkout-label checkout-label--tiny">
            <input type="number" className="checkout-input checkout-input--tiny" autoComplete="off" required name="streetnumber" />
            <span className="checkout-labelcontent">Nº</span>
          </label>
        </div>
        <div className="input-wrapper">
          <label htmlFor="doordetails" className="checkout-label" >
            <input type="text" className="checkout-input" autoComplete="off" required id="doordetails" name="doordetails" />
            <span className="checkout-labelcontent">Portal / Puerta / Escalera</span>
          </label>
        </div>
        <div className="input-wrapper">
          <label htmlFor="shippingcomments" className="checkout-label" >
            <textarea className="checkout-input checkout-input--textarea" autoComplete="off" id="shippingcomments" name="shippingcomments" cols={80} rows={20} />
            <span className="checkout-labelcontent">Comentarios para facilitar el envío</span>
          </label>
          <span className="note-span">*Opcional:  Escribe cualquier comentario que pueda facilitar el envío al repartirdor.</span>
        </div>
        <button formAction="post" type="submit" className="checkoutform-bt"  >Verificar los datos</button>
      </form>
  )
}