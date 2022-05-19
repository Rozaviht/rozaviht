import React, { useContext } from 'react'
import { gql, useMutation } from '@apollo/client'

import { CheckoutContext } from 'services/CheckoutContext'
import { ErrorMessage, Field, Form, Formik, validateYupSchema, yupToFormErrors } from 'formik'
import { shippingFormRules } from 'middleware/validations'
import CheckoutInput from './CheckoutInput'

import provinciasData from "../data/pronviciasData.json"
import municipiosData from "../data/municipiosData.json"
import { inputsParams } from '../data/checkoutInputsParams'




const VALIDATE_CHECKOUT_FORM = gql`
  mutation Mutation($input: shippingFormInputs) {
    validateShippingForm(input: $input) {
      message
      error
    }
  }
`

export default function checkoutForm () {
  const [ validateShippingForm ] = useMutation(VALIDATE_CHECKOUT_FORM)
  const { shippingForm, setShippingForm, setEditingForm } = useContext(CheckoutContext)

  const firstInputs = inputsParams.slice(0, 4)


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
        name: shippingForm.name,
        lastName: shippingForm.lastName,
        email: shippingForm.email,
        phone: shippingForm.phone,
        provincie: shippingForm.provincie,
        city: shippingForm.city,
        postalcode: shippingForm.postalcode,
        address: shippingForm.address,
        addressNumber: shippingForm.addressNumber,
        door: shippingForm.door,
        shippingComment: shippingForm.shippingComment
      }}
      validate={values => {
        try {
          validateYupSchema(values, shippingFormRules, true, values)
        } catch (err) {
          return yupToFormErrors(err)
        }
        return {}
      }}
      onSubmit={(values, {setSubmitting}) => {
        const input = values
        console.log(values)
        validateShippingForm({variables:  {input}})
        .then(({data}) => {
            if (data.validateShippingForm.error === true) {
              scrollToInvalidInput()
              
            } else {
              setShippingForm({
                name: values.name,
                lastName: values.lastName,
                phone: values.phone,
                email: values.email,
                provincie: values.provincie,
                city: values.city,
                postalcode: values.postalcode,
                address: values.address,
                addressNumber: values.addressNumber,
                door: values.door,
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
        <Form className="checkoutForm">
          <div className="checkoutForm__section">
            <h2>Datos del comprador</h2>
            {firstInputs.map( (input, index) =>
              <CheckoutInput key={index} errors={errors} inputName={input.inputName} inputPlaceHolder={input.inputPlaceHolder} inputType={input.inputType} />
            )}
          </div>
          <div className="checkoutForm__section">
          <h2>Dirección de entrega</h2>
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
                    <option key={"municipio"+municipio.municipio_id} value={municipio.nombre} >{municipio.nombre}</option>
                  ))}
              </Field>
              <ErrorMessage name='city' component={'span'} className="checkout-input-errmssg" />
            </div>
            {/* INPUT POSTALCODE */}
            <CheckoutInput errors={errors} inputName={inputsParams[4].inputName} inputPlaceHolder={inputsParams[4].inputPlaceHolder} inputType={inputsParams[4].inputType} />
            {/* INPUT STREET & STREETNUMBER */}
            <div className="input-wrapper input-wrapper--multiple">
              <label htmlFor="address" className="checkout-label checkout-label--short">
                <Field  type="text" autoComplete="off" name="address" placeholder=" " className={errors.address ? "checkout-input checkout-input--short checkout-input--error" : "checkout-input checkout-input--short"}/>
                <span className="checkout-labelcontent">Calle</span>
              </label>
              <ErrorMessage name='address' component={'span'} className="checkout-input-errmssg" />
              <label htmlFor="addressNumber" className="checkout-label checkout-label--tiny">
                <Field  type="text" autoComplete="off" name="addressNumber" placeholder=" " onWheelCapture={numberInputOnWheelPreventChange} className={errors.addressNumber ? "checkout-input checkout-input--tiny checkout-input--error" : "checkout-input checkout-input--tiny"}/>
                <span className="checkout-labelcontent">Nº</span>
              </label>
              <ErrorMessage name='addressNumber' component={'span'} className="checkout-input-errmssg" />
            </div>
            {/* INPUT DOORDETAILS */}
            <CheckoutInput errors={errors} inputName={inputsParams[5].inputName} inputPlaceHolder={inputsParams[5].inputPlaceHolder} inputType={inputsParams[5].inputType} />
            {/* INPUT SHIPPINGCOMMENTS */}
            <div className="input-wrapper">
              <label htmlFor="shippingComment" className="checkout-label" >
                <Field as="textarea"  className="checkout-input checkout-input--textarea" autoComplete="off" name="shippingComment" placeholder=" "/>
                <span className="checkout-labelcontent">Comentarios para facilitar el envío</span>
              </label>
              <ErrorMessage name='shippingComment' component={'span'} className="checkout-input-errmssg" />
              <span className="note-span">*Opcional:  Escribe algún comentario que pueda facilitar la entrega al repartirdor.</span>
            </div>
          </div>
          <button type="submit" className="checkoutform-bt" disabled={isSubmitting} >Verificar los datos</button>
        </Form>
      )}
    </Formik>
  )
}