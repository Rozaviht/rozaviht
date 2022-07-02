import { extendType, objectType } from "nexus";

export const OrderNumber = objectType({
  name: 'orderNumber',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.int('number')
  }
})

export const SuccessResponse = objectType({
  name: 'createOrderNumberRes',
  definition(t) {
    t.nonNull.boolean('success')
  }
})
