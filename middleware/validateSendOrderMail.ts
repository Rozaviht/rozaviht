import { FieldResolver } from "nexus";
import { contactMessageRules } from './validations'
import * as yup from 'yup'
import { sendContactMail } from "../pages/api/sendContactMail";

export const validateSendContactMail: FieldResolver<
  'Mutation',
  'validateSendContactMail'
> = async (_, {input}) => {
  try {
    await contactMessageRules.validate(input)
  } catch (err) {
    return {
      message: [ "Ups Vaya ha habido un error!!" ,(err as yup.ValidationError).message || 'Email no valido'],
      error: true
    }
  }

  await sendContactMail(input)

  return {
    message: [ "Perfecto!!, se ha enviado tu duda" , "Te responderemos lo antes posible."],
    error: true
  }
}