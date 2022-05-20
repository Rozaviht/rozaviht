import { extendType, intArg, nonNull, objectType } from "nexus";
import {createOrderNumber} from 'middleware/createOrderNumber'

export const OrderNumber = objectType({
  name: 'orderNumber',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.int('number')
  }
})

const CreateOrderNumberRes = objectType({
  name: 'createOrderNumberRes',
  definition(t) {
    t.nonNull.boolean('success')
  }
})

export const storeOrderNumber = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOrderNumber', {
      type: CreateOrderNumberRes,
      resolve: createOrderNumber,
    })
  } 
})
