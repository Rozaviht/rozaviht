import { FieldResolver } from 'nexus';
import prisma from '../lib/prisma'


export const createCustomer: FieldResolver<
  'Mutation',
  'createCustomer'
> = async (_, {input}) => {

    try {
        await prisma.customer_information.create({
            data: {
                name: input!.name,
                lastName: input!.lastName,
                phone: input!.phone,
                email: input!.email,
                cif: input?.cif,
                provincie: input!.provincie,
                city: input!.city,
                postalCode: input!.postalcode,
                address:  `${input!.address}, ${input!.addressNumber}`, 
                door: input!.door,
                comment: input?.shippingComment
            }
        })

        return {
            success: true
        }
    }

    catch {
        return{
            success: false
        }
    }
}