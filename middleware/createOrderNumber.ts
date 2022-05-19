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