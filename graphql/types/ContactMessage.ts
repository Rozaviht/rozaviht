import { validateSendContactMail } from "middleware/validateSendContactMail";
import { arg, extendType, inputObjectType } from "nexus";
import { PopUpResponse } from "./User";

export const ContactMessageInputs = inputObjectType({
  name: 'contactMessageInputs',
  definition(t) {
    t.nonNull.string('subject')
    t.string('orderNumber')
    t.nonNull.string('name')
    t.nonNull.string('mail')
    t.nonNull.string('message')
  }
})


export const ValidateSendContactMail = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('validateSendContactMail', {
      type: PopUpResponse,
      args: {
        input: arg({
          type: ContactMessageInputs
        })
      },
      resolve: validateSendContactMail,
    })
  }
})