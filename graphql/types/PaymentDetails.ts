import { enumType, objectType } from 'nexus'
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

