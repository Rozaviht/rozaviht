import { orderDetailRules, userValidation } from './validations'
import prisma from 'lib/prisma';
import { FieldResolver } from 'nexus';
import * as yup from 'yup'

export const validateCreateUser: FieldResolver<
  'Mutation',
  'createUser'
> = async (_, {email}) => {
  try {
    await userValidation.validate(email)
    return {
      message: 'Email sub',
      error: false
    }

  } catch (err) {
    const message = (err as yup.ValidationError).message || 'Email no valido'
    return {
      message,
      error: true
    }
  }
}