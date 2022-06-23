import { FieldResolver } from 'nexus';
import prisma from '../lib/prisma'


export const createOrderDetails: FieldResolver<
  'Mutation',
  'createOrderDetails'
> = async (_, {input}) => {
    
}