import * as yup from 'yup'

export const userValidation = yup.object({
  email: yup
  .string()
  .required('El email es obligatorio')
  .email('Este formato de email no es valido, verifica que sea como este formato: abc@email.com.')
})