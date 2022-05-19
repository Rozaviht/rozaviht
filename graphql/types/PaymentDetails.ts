import { paymentRequest } from 'middleware/paymentRequest'
import { enumType, extendType, floatArg, intArg, nonNull, objectType, stringArg } from 'nexus'
import { OrderDetails } from './OrderDetails'


export const PaymentDetails = objectType({
  name: 'PaymentDetails',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.int('amount')
    t.nonNull.string('provider')
    t.nonNull.field('status', {type: PaymentStatus})
    t.nonNull.field('order', {
      type: OrderDetails,
      async resolve(_parent, _args, context) {
        return await context.prisma.order_details.findUnique({
          where: {
            paymentDetailsId: _parent.id
          }
        })
      }
    })
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
      args: { totalCartPrice: nonNull(floatArg())},
      resolve: paymentRequest,
    })
  } 
})
