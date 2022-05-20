import prisma from "lib/prisma";
import { FieldResolver } from "nexus";

export const createOrderNumber: FieldResolver<
  'Mutation',
  'createOrderNumber'
> = async (_, __) => {

  try {
    const oderNumbersInDb = await prisma.order_number.findMany({
      select: {
        number: true
      }
    })
    /* 456789, 45879, 789456 this numbers was teste in redsys before so redsys wont enable to do the transaction with theses numbers.*/

    if (oderNumbersInDb.length === 456789 || oderNumbersInDb.length === 45879 || oderNumbersInDb.length === 789456) {
      await prisma.order_number.create({
        data: {
          number: oderNumbersInDb.length + 2
        }
      })
    }

    await prisma.order_number.create({
      data: {
        number: oderNumbersInDb.length + 1
      }
    })

    return {
      success: true
    }
  } catch {
    return {
      success: false
    }

  }

}