import * as yup from 'yup'

const customerName = yup
  .string()
  .required('Es obligatorio introducir un nombre')
  .min(2, 'El nombre debe ser al menos de 2 caracteres.')
  .matches(/^[A-Za-z]+$/, 'El nombre solo debe contener letras y números.')

const customerLastName = yup
  .string()
  .required('Es obligatorio introducir un nombre')
  .min(2, 'El nombre debe ser al menos de 2 caracteres.')
  .matches(/^[A-Za-z]+$/, 'El nombre solo debe contener letras y números.')

const phone = yup
  .string()
  .required('El némero de telefono es obligatorio')
  .min(9, 'El némero de telefono ha de ser de 9 digitos.')
  .max(9, 'El némero de telefono ha de ser de 9 digitos.')
  .matches(/^[0-9]+$/, 'El némero de teléfono solo debe contener números.')

const email = yup
  .string()
  .required('El email es obligatorio.')
  .email('Este formato de email no es valido, verifica que sea como este formato: abc@email.com.')


const address = yup
  .string()
  .required('La direccion es obligatoria.')
  .matches(/^\w+$/, 'La dirección solo debe contener letras y números.')
  
const provincie = yup
  .string()
  .required('La provincia es obligatoria.')
  .matches(/^[A-Za-z]+$/, 'La provincia solo debe contener letras y números.')

const city = yup
  .string()
  .required('El municipio es obligatoria.')
  .matches(/^[A-Za-z]+$/, 'El municipio solo debe contener letras y números.')

const comment = yup
  .string()
  .matches(/^\w+$/, 'El comentario de envío solo debe contener letras y números.')

export const orderDetailRules = yup.object().shape({
  customerName,
  customerLastName,
  phone,
  email,
  address,
  provincie,
  city,
  comment
})