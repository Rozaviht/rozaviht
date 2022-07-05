import { arg, extendType, inputObjectType, objectType } from "nexus";
import { CustomerInformation } from "./CustomerInformation";
import { Product } from "./Product";
import { createOrder } from '../../middleware/createOrder'
import { ShippingFormInputs } from './CustomerInformation'
import { BillingFormInputs } from './CustomerInformation'



export const OrderDetails = objectType({
  name: 'orderDetails',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.int('amount')
    t.nonNull.string('shippingInfoId')
    t.nonNull.string('billingInfoId')
    t.field('shippingInfo', {
      type: CustomerInformation,
      async resolve(_parent, _args, context) {
        return await context.prisma.shipping_information.findUnique({
          where: {
            id: _parent.shippingInfoId!
          }
        })
      }
    })
    t.field('billingInfo', {
      type: CustomerInformation,
      async resolve(_parent, _args, context) {
        return await context.prisma.billing_information.findUnique({
          where: {
            id: _parent.billingInfoId!
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
    t.nonNull.float('amount')
    t.nonNull.string('shippingMethod')
    t.nonNull.list.string('products')
  }
})

export const createOrderRes = objectType({
  name: 'createOrderRes',
  definition(t) {
    t.nonNull.boolean('success')
    t.nonNull.string('orderNumber')
  }
})

export const CreateOrder = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOrder', {
      type: createOrderRes,
      args: {
        orderInputs: arg({
          type: OrderInputs
        }),
        shippingForm: arg({
          type: ShippingFormInputs
        }),
        billingForm: arg({
          type: BillingFormInputs
        })
      },
      resolve: createOrder,
    })
  } 
})