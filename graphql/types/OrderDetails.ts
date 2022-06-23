import { arg, extendType, inputObjectType, objectType } from "nexus";
import { CustomerInformation } from "./CustomerInformation";
import { Product } from "./Product";
import { createOrderDetails } from '../../middleware/createOrderDetails'
import { SuccessResponse } from './OrderNumber'

export const OrderDetails = objectType({
  name: 'orderDetails',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.int('amount')
    t.nonNull.string('customerId')
    t.field('customer', {
      type: CustomerInformation,
      async resolve(_parent, _args, context) {
        return await context.prisma.customer_information.findUnique({
          where: {
            id: _parent.customerId
          }
        })
      }
    })
    t.nonNull.list.field('products', {
      type: Product,
      async resolve(_parent, _args, context) {
        return await context.prisma.products.findMany({})
      }
    })
  }
})


const OrderInputs = inputObjectType({
  name: 'orderInputs',
  definition(t) {
    t.nonNull.string('amount')
    t.nonNull.list.string('products')
  }
})

export const CreateOrderDetails = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOrderDetails', {
      type: SuccessResponse,
      args: {
        input: arg({
          type: OrderInputs
        })
      },
      resolve: createOrderDetails,
    })
  } 
})