import { customerInfoRules } from './validations'
import { FieldResolver } from 'nexus';
import * as yup from 'yup'


export const validateShippingForm: FieldResolver<
  'Mutation',
  'validateShippingForm'
> = async (_, {input}) => {
  try {
    console.log(input)
    await customerInfoRules.validate(input)
    
    return {
      message: ['Se ha validado correctamente el formulario'],
      error: false
    }
  } catch (err) {
    console.log(err)
    return {
      message: [(err as yup.ValidationError).message] || ['El formulario no es valido'],
      error: true
    }
  }
}