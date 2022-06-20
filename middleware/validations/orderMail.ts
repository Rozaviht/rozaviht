import * as yup from 'yup'

const totalPrice = yup
.string()
.required()
.matches(/^[0-9]+$/, 'El número de teléfono solo debe contener números.')

const subtotalPrice = yup
.string()
.required()
.matches(/^[0-9]+$/, 'El número de teléfono solo debe contener números.')
  
  const iva = yup
  .string()
  .required()
  .matches(/^[0-9]+$/, 'El número de teléfono solo debe contener números.')

const customerEmail = yup
  .string()
  .required()
  .matches(/^[0-9]+$/, 'El número de teléfono solo debe contener números.')


export const contactMessageRules = yup.object().shape({
  totalPrice,
  subtotalPrice,
  iva,
  customerEmail
})