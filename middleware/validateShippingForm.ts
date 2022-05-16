import { customerInfoRules } from './validations'
import { FieldResolver } from 'nexus';
import * as yup from 'yup'


export const validateShippingForm: FieldResolver<
  'Mutation',
  'validateShippingForm'
> = async (_, {shippingFormData}) => {
  try {
    await customerInfoRules.validate(shippingFormData)

    return {
      message: 'Se ha validado correctamente el formulario',
      error: false
    }
  } catch (err) {
    return {
      message: (err as yup.ValidationError).message || 'El formulario no es valido',
      error: true
    }
  }
}