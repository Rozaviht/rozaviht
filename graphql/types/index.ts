import { decorateType } from 'nexus'
import { GraphQLDate } from 'graphql-scalars'

export const GQLDate = decorateType(GraphQLDate, {
  sourceType: 'Date',
  asNexusMethod: 'date'
})

export * from './Article'
export * from './ArticleCategory'
export * from './Image'
export * from './Product'
export * from './ProductCategory'
export * from './User'
export * from './OrderDetails'
export * from './PaymentDetails'