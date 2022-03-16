import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'

import CheckoutLayout from '@components/CheckoutLayout'

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

export default function checkoutPage ()  {
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


  return (
    <div className="shippingdata">
      <h1 className="checkout-title" >Introduce tus datos de envío</h1>
      <form className="checkout-form">
        <div className="input-wrapper">
          <label htmlFor="name" className="checkout-label" >
            <input type="text" className="checkout-input" autoComplete="off" required id="name" />
            <span className="checkout-labelcontent">Nombre</span>
          </label>
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastname" className="checkout-label">
            <input type="text" className="checkout-input" autoComplete="off" required id="lastname" />
            <span className="checkout-labelcontent">Apellidos</span>
          </label>
        </div>
        <div className="input-wrapper">
          <label htmlFor="mail" className="checkout-label">
            <input type="mail" className="checkout-input" autoComplete="off" required id="mail" />
            <span className="checkout-labelcontent">Email</span>
          </label>
        </div>
        <div className="input-wrapper">
          <label htmlFor="phone" className="checkout-label">
            <input type="number" className="checkout-input" autoComplete="off" required onWheelCapture={numberInputOnWheelPreventChange} id="phone" />
            <span className="checkout-labelcontent">Teléfono</span>
          </label>
        </div>
        <div className="select-wrapper">
          <select className="checkout-select" name="provincias" id="selProvincias" placeholder="Provincia" defaultValue={"0"} onChange={e => setCurrentProvincia(e.target.value)}>
            <option hidden >Provincia</option>
            {provinciasData.map(provincia => (
              <option className="checkout-option" key={"provincia"+provincia.provincia_id} value={provincia.provincia_id} >{provincia.nombre}</option>
            ))}
          </select>
        </div>
        <div className="select-wrapper">
          <select className="checkout-select" name="municipios" id="selMunicipios" placeholder="Localidad" defaultValue={"0"} onChange={e => setCurrentMunicipio(e.target.value)}>
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
            <input type="text" defaultValue={currentMunicipio} className="checkout-input" autoComplete="off" required id="postalcode" />
            <span className="checkout-labelcontent">Código Postal</span>
          </label>
        </div>
        <div className="input-wrapper">
          <label htmlFor="" className="checkout-label">
            <input type="text" className="checkout-input" autoComplete="off" required />
            <span className="checkout-labelcontent">Dirección</span>
          </label>
        </div>
      </form>
    </div>
  )
}


checkoutPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <CheckoutLayout>
      {page}
    </CheckoutLayout>
  )
}