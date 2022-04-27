import { enumType, objectType } from 'nexus'

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

