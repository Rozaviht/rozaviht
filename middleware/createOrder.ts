import { FieldResolver } from 'nexus';
import prisma from '../lib/prisma'


export const createOrder: FieldResolver<
  'Mutation',
  'createOrder'
> = async (_, {orderInputs, shippingForm, billingForm}) => {

  try {
    //Take all order numbers in db
    const orderNumbersInDb = await prisma.order_number.findMany({
      select: {
        number: true
      }
    })
  
    //Create the order details
    await prisma.order_details.create({
      data: {
        paymentStatus: "PEND",
        amount: orderInputs!.amount,
        products: {
          connect: orderInputs?.products.map((product : string | null) => ({name: product!}))
        },
        shippingInfo: {
          create: {
            name: shippingForm!.name,
            lastName: shippingForm!.lastName,
            email: shippingForm!.email,
            phone: shippingForm!.phone,
            provincie: shippingForm!.provincie,
            city: shippingForm!.city,
            postalCode: shippingForm!.postalcode,
            address: `${shippingForm!.address} ${shippingForm!.addressNumber}, ${shippingForm!.door}`,
            comment: shippingForm!.shippingComment
          }
        },
        billingInfo: {
          create: {
            name: billingForm!.name,
            lastName: billingForm!.lastName,
            email: billingForm!.email,
            phone: billingForm!.phone,
            provincie: billingForm!.provincie,
            city: billingForm!.city,
            postalCode: billingForm!.postalcode,
            address: `${billingForm!.address} ${billingForm!.addressNumber}, ${billingForm!.door}`,
            cif: billingForm!.cif
          }
        },
        orderNumber: {
          create: {
            number: `10${orderNumbersInDb.length.toString().padStart(7, "0")}`
          }
        },
        shippingDetails: {
          create: {
            shippingMode: orderInputs!.shippingMethod === 'STAN' ? 'STAN' : 'EXPR',
            shippingProcess: 'NOTS'
          }
        }
      }
    })
  
    return {
      success: true,
      orderNumber: `10${orderNumbersInDb.length.toString().padStart(7, "0")}`
    }
  }

  catch {
    return {
      success: false,
      orderNumber: ""
    }
  }
}