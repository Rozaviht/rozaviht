import * as yup from 'yup'

const name = yup
  .string()
  .required('Es obligatorio introducir un nombre')
  .min(2, 'El nombre debe ser al menos de 2 caracteres.')
  .matches(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/, 'El nombre solo debe contener letras.')

const mail = yup
  .string()
  .required('El email es obligatorio.')
  .email('Este formato de email no es valido, verifica que sea como este formato: abc@email.com.')
  
  const subject = yup
  .string()
  .required('El asunto del correo es obligatorio.')
  .required('La provincia es obligatoria.')

const phone = yup
  .string()
  .min(9, 'El número de telefono ha de ser de 9 digitos.')
  .max(9, 'El número de telefono ha de ser de 9 digitos.')
  .matches(/^[0-9]+$/, 'El número de teléfono solo debe contener números.')

const message = yup
  .string()
  .required('El contenido del correo es obligatorio.')
  .matches(/^$|^[ñA-Za-z0-9 -/_]*[ñA-Za-z0-9][ñA-Za-z0-9 -/_]*$/, 'Parece que hay un caracter no permitido en el campo del contenido del correo.')


export const contactMessageRules = yup.object().shape({
  name,
  mail,
  subject,
  phone,
  message
})