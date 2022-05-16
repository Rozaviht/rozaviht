import React, { useState, useContext } from 'react'

import { CheckoutContext } from 'services/CheckoutContext'

import provinciasData from "../data/pronviciasData.json"
import municipiosData from "../data/municipiosData.json"
import { ErrorMessage, Field, Form, Formik, validateYupSchema, yupToFormErrors } from 'formik'
import { customerInfoRules } from 'middleware/validations'
import { gql, useMutation } from '@apollo/client'

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


const VALIDATE_CHECKOUT_FORM = gql`
  mutation Mutation($shippingFormData: shippingFormData) {
    validateShippingForm(shippingFormData: $shippingFormData) {
      message
      error
    }
  }
`

export default function checkoutForm () {
  const [ validateShippingForm, {data, loading, error} ] = useMutation(VALIDATE_CHECKOUT_FORM)
  const { checkoutFormData, setCheckoutFormData, setEditingForm } = useContext(CheckoutContext)

  const [currentMunicipio, setCurrentMunicipio] = useState("")
  const [currentProvincia, setCurrentProvincia] = useState(checkoutFormData.provincie)


  const numberInputOnWheelPreventChange = (e: any) => {
    // Prevent the input value change
    e.target.blur()
  
    // Prevent the page/container scrolling
    e.stopPropagation()
  
    // Refocus immediately, on the next tick (after the current function is done)
    setTimeout(() => {
      e.target.focus()
    }, 0)
  }

  function scrollToInvalidInput() {
    const invalidInputs = Array.from(document.querySelectorAll('.checkout-input--error'))
    invalidInputs.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)                      // sort inputs by offset from top of viewport (handles issues with multi-column layouts, where the first element in the markup isn't necessarily the highest on the page)
    invalidInputs[0].scrollIntoView({ block: 'center', behavior: 'smooth' })
  }


  return (
    <Formik 
      initialValues={{
        name: '',
        lastName: '',
        email: '',
        phone: '',
        cif: '',
        provincie: '',
        city: '',
        postalcode: '',
        address: '',
        addressNumber: '',
        doorDetails: '',
        shippingComment: ''
      }}
      validationSchema={customerInfoRules}
      onSubmit={(values, {setSubmitting}) => {

        validateShippingForm({variables: values})
          .then(({data}) => {
            if (data.validateShippingForm.error === true) {
              console.log(data.validateShippingForm)
              scrollToInvalidInput()
            } else {
              setCheckoutFormData({
                name: values.name,
                lastname: values.lastName,
                phone: values.phone,
                email: values.email,
                cif: values.cif,
                provincie: values.provincie,
                city: values.city,
                postalcode: values.postalcode,
                address: values.address,
                addressNumber: values.addressNumber,
                doorDetails: values.doorDetails,
                shippingComment: values.shippingComment
              })
              setEditingForm(false)
            }
          })
          .catch (err => {
            console.log(err)
          })
          
          setSubmitting(false)
      }}
    >
      {({
        isSubmitting,
        errors,
        values
      }) => (
        <Form className="checkout-section">
          {/* INPUT NAME */}
            <div className="input-wrapper">
              <label htmlFor="name" className="checkout-label" >
                <Field  type="text" autoComplete="off" name="name" placeholder=" " className={errors.name ? "checkout-input checkout-input--error" : "checkout-input"}/>
                <span className="checkout-labelcontent">Nombre</span>
              </label>
                <ErrorMessage name='name' component={'span'} className="checkout-input-errmssg" />
            </div>
            {/* INPUT LASTNAME */}
            <div className="input-wrapper">
              <label htmlFor="lastName" className="checkout-label">
                <Field  type="text" autoComplete="off" name="lastName" placeholder=" " className={errors.lastName ? "checkout-input checkout-input--error" : "checkout-input"}/>
                <span className="checkout-labelcontent">Apellidos</span>
              </label>
              <ErrorMessage name='lastName' component={'span'} className="checkout-input-errmssg" />
            </div>
            {/* INPUT EMAIL */}
            <div className="input-wrapper">
              <label htmlFor="email" className="checkout-label">
                <Field  type="email" autoComplete="off" name="email" placeholder=" " className={errors.email ? "checkout-input checkout-input--error" : "checkout-input"}/>
                <span className="checkout-labelcontent">Email</span>
              </label>
              <ErrorMessage name='email' component={'span'} className="checkout-input-errmssg" />
            </div>
            {/* INPUT PHONE */}
            <div className="input-wrapper">
              <label htmlFor="phone" className="checkout-label">
                <Field  type="number" autoComplete="off" onWheelCapture={numberInputOnWheelPreventChange} name="phone" placeholder=" " className={errors.phone ? "checkout-input checkout-input--error" : "checkout-input"}/>
                <span className="checkout-labelcontent">Teléfono</span>
              </label>
              <ErrorMessage name='phone' component={'span'} className="checkout-input-errmssg" />
            </div>
            {/* INPUT CIF */}
            <div className="input-wrapper">
              <label htmlFor="cif" className="checkout-label">
                <Field  type="text" autoComplete="off" name="cif" placeholder=" " className="checkout-input"/>
                <span className="checkout-labelcontent">DNI / NIF / CIF</span>
              </label>
              <span className="note-span">*Este campo es opcional, para solicitar la factura ampliada con el DNI/NIF/CIF introducido.</span>
              <ErrorMessage name='cif' component={'span'} className="checkout-input-errmssg" />
            </div>
            {/* INPUT PROVINCIE */}
            <div className="select-wrapper">
              <Field as="select" className="checkout-select" name="provincie">
                <option className="checkout-option">Elige tu provincia</option>
                {provinciasData.map(provincia => (
                  <option className="checkout-option" key={"provincia"+provincia.provincia_id} value={provincia.provincia_id} >{provincia.nombre}</option>
                ))}
              </Field>
              <ErrorMessage name='provincie' component={'span'} className="checkout-input-errmssg" />
            </div>
            {/* INPUT MUNICIPIE */}
            <div className="select-wrapper">
              <Field component="select" className="checkout-select" name="city">
                <option className="checkout-option">Elige tu municipio</option>
                  {municipiosData.filter(municipio =>
                    municipio.provincia_id === values.provincie
                  ).map(municipio => (
                    <option key={"municipio"+municipio.municipio_id} value={municipio.municipio_id} >{municipio.nombre}</option>
                  ))}
              </Field>
              <ErrorMessage name='city' component={'span'} className="checkout-input-errmssg" />
            </div>
            {/* INPUT POSTALCODE */}
            <div className="input-wrapper">
              <label htmlFor="postalcode" className="checkout-label">
                <Field type="text"  autoComplete="off" name="postalcode" placeholder=" " className={errors.postalcode ? "checkout-input checkout-input--error" : "checkout-input"}/>
                <span className="checkout-labelcontent">Código Postal</span>
              </label>
              <ErrorMessage name='postalcode' component={'span'} className="checkout-input-errmssg" />
            </div>
            {/* INPUT STREET & STREETNUMBER */}
            <div className="input-wrapper input-wrapper--multiple">
              <label htmlFor="address" className="checkout-label checkout-label--short">
                <Field  type="text" autoComplete="off" name="address" placeholder=" " className={errors.address ? "checkout-input checkout-input--short checkout-input--error" : "checkout-input checkout-input--short"}/>
                <span className="checkout-labelcontent">Calle</span>
              </label>
              <ErrorMessage name='address' component={'span'} className="checkout-input-errmssg" />
              <label htmlFor="addressNumber" className="checkout-label checkout-label--tiny">
                <Field  type="number" autoComplete="off" name="addressNumber" placeholder=" " onWheelCapture={numberInputOnWheelPreventChange} className={errors.addressNumber ? "checkout-input checkout-input--tiny checkout-input--error" : "checkout-input checkout-input--tiny"}/>
                <span className="checkout-labelcontent">Nº</span>
              </label>
              <ErrorMessage name='addressNumber' component={'span'} className="checkout-input-errmssg" />
            </div>
            {/* INPUT DOORDETAILS */}
            <div className="input-wrapper">
              <label htmlFor="doorDetails" className="checkout-label" >
                <Field  type="text" autoComplete="off" name="doorDetails" placeholder=" " className={errors.doorDetails ? "checkout-input checkout-input--error" : "checkout-input"}/>
                <span className="checkout-labelcontent">Portal / Puerta / Escalera</span>
              </label>
              <ErrorMessage name='doorDetails' component={'span'} className="checkout-input-errmssg" />
            </div>
            {/* INPUT SHIPPINGCOMMENTS */}
            <div className="input-wrapper">
              <label htmlFor="shippingComment" className="checkout-label" >
                <textarea  className="checkout-input checkout-input--textarea" autoComplete="off" name="shippingComment" placeholder=" "/>
                <span className="checkout-labelcontent">Comentarios para facilitar el envío</span>
              </label>
              <ErrorMessage name='shippingComment' component={'span'} className="checkout-input-errmssg" />
              <span className="note-span">*Opcional:  Escribe algún comentario que pueda facilitar la entrega al repartirdor.</span>
            </div>
            <button type="submit" className="checkoutform-bt" disabled={isSubmitting} >Verificar los datos</button>
          </Form>
      )}
    </Formik>
  )
}