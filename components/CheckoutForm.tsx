import React, { useEffect, useState, useContext } from 'react'

import type { checkoutFormDataType } from 'services/CheckoutProvider'

import { CheckoutContext } from 'services/CheckoutContext'

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


export type inputsErrorsProps = [{
  id: string,
  message: string
}]

export default function checkoutForm () {
  const { checkoutFormData, setCheckoutFormData, setEditingForm } = useContext(CheckoutContext)

  const [currentMunicipio, setCurrentMunicipio] = useState("")
  const [currentProvincia, setCurrentProvincia] = useState(checkoutFormData.provincie)
  const [errorsMessages, setErrorsMessages] = useState<inputsErrorsProps>()


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

  const validateInputsForm = (formData:checkoutFormDataType) => {

    const inputsErrors = [{}] as inputsErrorsProps

    if (formData.name.length === 0) {
      inputsErrors.push({
        id: "noName",
        message: "**Debes introducir un nombre"
      })
    } 

    if (formData.lastname.length === 0) {
      inputsErrors.push({
        id: "noLastname",
        message: "**Debes introducir un apellido."
      })
    } 

    if (formData.provincie === "Provincia") {
      inputsErrors.push({
        id: "noProvincie",
        message: "**Debes introducir una provincia."
      })
    }

    if (formData.municipie === "Municipio") {
      inputsErrors.push({
        id: "noMunicipie",
        message: "**Debes introducir un municipio."
      })
    }

    if (formData.postalcode.length === 0) {
      inputsErrors.push({
        id: "noPostalcode",
        message: "**Debes introducir un código postal."
      })
    }

    if (formData.street.length === 0) {
      inputsErrors.push({
        id: "noStreet",
        message: "**Debes introducir una calle."
      })
    }

    if (formData.streetnumber.length === 0) {
      inputsErrors.push({
        id: "noStreetnumber",
        message: "**Debes introducir un número de calle."
      })
    }

    if (formData.email.length < 7 || formData.email.split("").filter((i) => i === "@").length !== 1 || formData.email.indexOf(".") === -1) {
      inputsErrors.push({
        id: "wrongEmail",
        message: "**El formato de correo electrónico que has introducido no es correcto. Asegurate que es parecido a esto ****@****.com "
      })
    }

    if (formData.phone.length !== 9) {
      inputsErrors.push({
        id: "wrongPhone",
        message: "**El número de teléfono ha de tener 9 dígitos. Asegurate que has introducido el formato adecuado."
      })
    }

    return inputsErrors
  }


  function scrollToInvalidInput() {
    const invalidInputs = Array.from(document.querySelectorAll('.checkout-input--error'))
    invalidInputs.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)                      // sort inputs by offset from top of viewport (handles issues with multi-column layouts, where the first element in the markup isn't necessarily the highest on the page)
    invalidInputs[0].scrollIntoView({ block: 'center', behavior: 'smooth' })
  }



  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = {
      name: event.target.name.value,
      lastname: event.target.lastname.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      cif: event.target.cif.value,
      provincie: event.target.provincie.value,
      municipie: event.target.municipie.value,
      postalcode: event.target.postalcode.value,
      street: event.target.street.value,
      streetnumber: event.target.streetnumber.value,
      doordetails: event.target.doordetails.value,
      shippingcomments: event.target.shippingcomments.value
    } as checkoutFormDataType

    const checkedInputsErrors = validateInputsForm(formData)
    

    if (checkedInputsErrors.length > 1) {
      setErrorsMessages(checkedInputsErrors)
      return
    }

    setCheckoutFormData(formData)
    setEditingForm(false)
  }

  useEffect(() => {
    console.log(checkoutFormData)
    if (errorsMessages?.length > 1)  scrollToInvalidInput()
  },[errorsMessages])

  return (
    <form className="checkout-section" id="checkoutForm" method="post" onSubmit={handleSubmit}>
      {/* INPUT NAME */}
        <div className="input-wrapper">
          <label htmlFor="name" className="checkout-label" >
            <input defaultValue={checkoutFormData.name} type="text" autoComplete="off" id="name" name="name" placeholder=" " className={errorsMessages?.some( error => error.id === "noName") ? "checkout-input checkout-input--error" : "checkout-input"}/>
            <span className="checkout-labelcontent">Nombre</span>
          </label>
            {errorsMessages?.filter(error => error.id === "noName").map(error =>
              <span className="checkout-input-errmssg" key={error.id}>{error.message}</span>
            )}
        </div>
        {/* INPUT LASTNAME */}
        <div className="input-wrapper">
          <label htmlFor="lastname" className="checkout-label">
            <input defaultValue={checkoutFormData.lastname} type="text" autoComplete="off" id="lastname" name="lastname" placeholder=" " className={errorsMessages?.some(error => error.id === "noLastname") ? "checkout-input checkout-input--error" : "checkout-input"}/>
            <span className="checkout-labelcontent">Apellidos</span>
          </label>
            {errorsMessages?.filter(error => error.id === "noLastname").map(error =>
              <span className="checkout-input-errmssg" key={error.id}>{error.message}</span>
            )}
        </div>
        {/* INPUT EMAIL */}
        <div className="input-wrapper">
          <label htmlFor="mail" className="checkout-label">
            <input defaultValue={checkoutFormData.email} type="email" autoComplete="off" id="email" name="email" placeholder=" " className={errorsMessages?.some(error => error.id === "wrongEmail") ? "checkout-input checkout-input--error" : "checkout-input"}/>
            <span className="checkout-labelcontent">Email</span>
          </label>
            {errorsMessages?.filter(error => error.id === "wrongEmail") 
            ?  
              errorsMessages?.filter(error => error.id === "wrongEmail").map(error =>
                <span className="checkout-input-errmssg" key={error.id}>{error.message}</span>
              )
            :
              <span className="note-span">*Este correo solo se usará para ennviarte la confirmación de compra con la correspondiente factura.</span>}
        </div>
        {/* INPUT PHONE */}
        <div className="input-wrapper">
          <label htmlFor="phone" className="checkout-label">
            <input defaultValue={checkoutFormData.phone} type="number" autoComplete="off" onWheelCapture={numberInputOnWheelPreventChange} id="phone" name="phone" placeholder=" " className={errorsMessages?.some(error => error.id === "wrongPhone") ? "checkout-input checkout-input--error" : "checkout-input"}/>
            <span className="checkout-labelcontent">Teléfono</span>
          </label>
          {errorsMessages?.filter(error => error.id === "wrongPhone").map(error =>
              <span className="checkout-input-errmssg" key={error.id}>{error.message}</span>
            )}
        </div>
        {/* INPUT CIF */}
        <div className="input-wrapper">
          <label htmlFor="cif" className="checkout-label">
            <input defaultValue={checkoutFormData.cif} type="text" autoComplete="off" id="cif" name="cif" placeholder=" " className="checkout-input"/>
            <span className="checkout-labelcontent">DNI / NIF / CIF</span>
          </label>
          <span className="note-span">*Este campo es opcional, para solicitar la factura ampliada con el DNI/NIF/CIF introducido.</span>
        </div>
        {/* INPUT PROVINCIE */}
        <div className="select-wrapper">
          <select className="checkout-select" name="provincie" id="selProvincias" defaultValue={checkoutFormData.provincie} onChange={e => setCurrentProvincia(e.target.value)}>
            <option className="checkout-option">Elige tu provincia</option>
            {provinciasData.map(provincia => (
              <option className="checkout-option" key={"provincia"+provincia.provincia_id} value={provincia.provincia_id} >{provincia.nombre}</option>
            ))}
          </select>
          {errorsMessages?.filter(error => error.id === "noProvincie").map(error =>
              <span className="checkout-input-errmssg" key={error.id}>{error.message}</span>
            )}
        </div>
        {/* INPUT MUNICIPIE */}
        <div className="select-wrapper">
          <select className="checkout-select" name="municipie" id="selMunicipios" defaultValue={checkoutFormData.municipie} onChange={e => setCurrentMunicipio(e.target.value)}>
            <option className="checkout-option">Elige tu municipio</option>
              {municipiosData.filter(municipio =>
                municipio.provincia_id === currentProvincia
              ).map(municipio => (
                <option key={"municipio"+municipio.municipio_id} value={municipio.municipio_id} >{municipio.nombre}</option>
              ))}
          </select>
          {errorsMessages?.filter(error => error.id === "noMunicipie").map(error =>
              <span className="checkout-input-errmssg" key={error.id}>{error.message}</span>
            )}
        </div>
        {/* INPUT POSTALCODE */}
        <div className="input-wrapper">
          <label htmlFor="postalcode" className="checkout-label">
            <input type="text" defaultValue={checkoutFormData.postalcode} autoComplete="off" id="postalcode" name="postalcode" placeholder=" " className={errorsMessages?.some(error => error.id === "noPostalcode") ? "checkout-input checkout-input--error" : "checkout-input"}/>
            <span className="checkout-labelcontent">Código Postal</span>
          </label>
          {errorsMessages?.filter(error => error.id === "noPostalcode").map(error =>
              <span className="checkout-input-errmssg" key={error.id}>{error.message}</span>
            )}
        </div>
        {/* INPUT STREET & STREETNUMBER */}
        <div className="input-wrapper input-wrapper--multiple">
          <label htmlFor="" className="checkout-label checkout-label--short">
            <input defaultValue={checkoutFormData.street} type="text" autoComplete="off" name="street" placeholder=" " className={errorsMessages?.some(error => error.id === "noStreet") ? "checkout-input checkout-input--short checkout-input--error" : "checkout-input checkout-input--short"}/>
            <span className="checkout-labelcontent">Calle</span>
            {errorsMessages?.filter(error => error.id === "noStreet").map(error =>
                <span className="checkout-input-errmssg" key={error.id}>{error.message}</span>
              )}
          </label>
          <label htmlFor="" className="checkout-label checkout-label--tiny">
            <input defaultValue={checkoutFormData.streetnumber} type="number" autoComplete="off" name="streetnumber" placeholder=" " onWheelCapture={numberInputOnWheelPreventChange} className={errorsMessages?.some(error => error.id === "noStreetnumber") ? "checkout-input checkout-input--tiny checkout-input--error" : "checkout-input checkout-input--tiny"}/>
            <span className="checkout-labelcontent">Nº</span>
            {errorsMessages?.filter(error => error.id === "noStreetnumber").map(error =>
                <span className="checkout-input-errmssg" key={error.id}>{error.message}</span>
              )}
          </label>
        </div>
        {/* INPUT DOORDETAILS */}
        <div className="input-wrapper">
          <label htmlFor="doordetails" className="checkout-label" >
            <input defaultValue={checkoutFormData.doordetails} type="text" className="checkout-input" autoComplete="off" id="doordetails" name="doordetails" placeholder=" "/>
            <span className="checkout-labelcontent">Portal / Puerta / Escalera</span>
          </label>
        </div>
        {/* INPUT SHIPPINGCOMMENTS */}
        <div className="input-wrapper">
          <label htmlFor="shippingcomments" className="checkout-label" >
            <textarea defaultValue={checkoutFormData.shippingcomments} className="checkout-input checkout-input--textarea" autoComplete="off" id="shippingcomments" name="shippingcomments" placeholder=" "/>
            <span className="checkout-labelcontent">Comentarios para facilitar el envío</span>
          </label>
          <span className="note-span">*Opcional:  Escribe algún comentario que pueda facilitar la entrega al repartirdor.</span>
        </div>
        <button formAction="post" type="submit" className="checkoutform-bt"  >Verificar los datos</button>
      </form>
  )
}