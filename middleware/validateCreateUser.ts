import { userValidation } from './validations'
import prisma from 'lib/prisma';
import { FieldResolver } from 'nexus';
import * as yup from 'yup'
import { sendSubMail } from '../pages/api/sendSubMail'


export const validateCreateUser: FieldResolver<
  'Mutation',
  'createUser'
> = async (_, {email}) => {
  try {
    await userValidation.validate(email)
  } catch (err) {
    return {
      message: (err as yup.ValidationError).message || 'Email no valido',
      error: true
    }
  }

    let userExist = await prisma.users.findUnique({
      where: {
        email: email
      }
    })
  
    if (userExist) {
      return {
        message: 'Este email ya esta registrado',
        error: true
      }
    }

    await sendSubMail(email)
  
    await prisma.users.create({
      data: {
        email: email
      }
    })
      return {
        message: 'Se ha registrado el email correctamente',
        error: false
      }
}