import { paymentRequest } from 'middleware/paymentRequest'
import { arg, enumType, extendType, floatArg, nonNull, objectType, stringArg } from 'nexus'
import { BillingFormInputs } from './CustomerInformation'


export const PaymentDetails = objectType({
  name: 'PaymentDetails',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.int('amount')
    t.nonNull.string('provider')
    t.nonNull.field('status', {type: PaymentStatus})
  }
})

const PaymentStatus = enumType({
  name: 'PaymentStatus',
  members: ['OPEN', 'CLOS', 'PEND', 'PROG']
})

const PaymentResponse = objectType({
  name: 'paymentResponse',
  definition(t) {
    t.nonNull.string('Ds_SignatureVersion')
    t.nonNull.string('Ds_MerchantParameters')
    t.nonNull.string('Ds_Signature')
  }
})


export const sendPaymentReq = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('paymentRequest', {
      type: PaymentResponse,
      args: { 
        orderAmount: nonNull(floatArg()),
        orderNumber: nonNull(stringArg()),
        billingForm: arg({
          type: BillingFormInputs
        })
      },
      resolve: paymentRequest,
    })
  } 
})
