import * as yup from 'yup'

const name = yup
  .string()
  .required('Es obligatorio introducir un nombre')
  .min(2, 'El nombre debe ser al menos de 2 caracteres.')
  .matches(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/, 'El nombre solo debe contener letras.')

const lastName = yup
  .string()
  .required('Es obligatorio introducir un apellido')
  .min(2, 'El nombre debe ser al menos de 2 caracteres.')
  .matches(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/, 'El nombre solo debe contener letras.')

const phone = yup
  .string()
  .required('El número de telefono es obligatorio')
  .min(9, 'El número de telefono ha de ser de 9 digitos.')
  .max(9, 'El número de telefono ha de ser de 9 digitos.')
  .matches(/^[0-9]+$/, 'El número de teléfono solo debe contener números.')

const cif = yup
  .string()
  .min(9, 'El DNI / NIE / CIF ha de ser de 9 digitos.')
  .max(9, 'El DNI / NIE / CIF ha de ser de 9 digitos.')
  .matches(/^[A-Za-z0-9]*[A-Za-z0-9][A-Za-z0-9]+$/, 'El DNI solo debe contener letras y números.')

const email = yup
  .string()
  .required('El email es obligatorio.')
  .email('Este formato de email no es valido, verifica que sea como este formato: abc@email.com.')

const provincie = yup
  .string()
  .required('La provincia es obligatoria.')
  
const city = yup
  .string()
  .required('El municipio es obligatorio.')
  
const postalcode = yup
  .string()
  .required('El código postal es obligatorio.')
  .matches(/^[0-9]+$/, 'El código postal solo debe contener números.')

const address = yup
  .string()
  .required('La direccion es obligatoria.')
  .matches(/^[ñA-Za-z0-9 -/_]*[ñA-Za-z0-9][ñA-Za-z0-9 -/_]*$/, 'Parece que hay un caracter no permitido en el campo de la calle.')

const addressNumber = yup
  .string()
  .required('El número de calle es obligatorio.')
  .matches(/^[0-9]+$/, 'El número de calle solo debe contener números.')
  

const door = yup
  .string()
  .required('El campo de portal/puerta/escalera es obligatorio.')
  .matches(/^[ñA-Za-z0-9 -/_]*[ñA-Za-z0-9][ñA-Za-z0-9 -/_]*$/, 'Parece que hay un caracter no permitido en el campo de portal/puerta/escalera.')

const shippingComment = yup
  .string()
  .matches(/^$|^[ñA-Za-z0-9 -/_]*[ñA-Za-z0-9][ñA-Za-z0-9 -/_]*$/, 'Parece que hay un caracter no permitido en el campo de comentarios de envío.')

export const customerInfoRules = yup.object().shape({
  name,
  lastName,
  email,
  phone,
  cif,
  provincie,
  city,
  postalcode,
  address,
  addressNumber,
  door,
  shippingComment
})