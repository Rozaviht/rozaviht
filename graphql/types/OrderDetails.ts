import { objectType } from 'nexus'

export const OrderDetails = objectType({
  name: 'OrderDetails',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('customerName')
    t.nonNull.string('customerLastName')
    t.nonNull.string('phone')
    t.nonNull.string('email')
    t.nonNull.string('address')
    t.nonNull.string('provincie')
    t.nonNull.string('city')
    t.nonNull.string('amount')
    t.string('comment')
  }
})