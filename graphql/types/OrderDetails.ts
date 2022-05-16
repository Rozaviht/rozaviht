import { extendType, inputObjectType, nonNull, objectType, stringArg } from "nexus";
import { CustomerInformation } from "./CustomerInformation";
import { PaymentDetails } from "./PaymentDetails";
import { Product } from "./Product";

export const OrderDetails = objectType({
  name: 'orderDetails',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.int('amount')
    t.nonNull.string('customerId')
    t.nonNull.string('paymentDetailsId')
    t.nonNull.field('customer', {
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
    t.nonNull.field('paymentDetails', {
      type: PaymentDetails,
      async resolve(_parent, _args, context) {
        return await context.prisma.payment_details.findUnique({
          where: {
            id: _parent.paymentDetailsId
          }
        })
      }
    })
  }
})