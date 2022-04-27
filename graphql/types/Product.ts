import { objectType, extendType } from "nexus";
import { Image } from "./Image";
import { ProductCategory } from "./ProductCategory";

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.string('description')
    t.nonNull.int('price')
    t.list.field('images', {
      type: Image,
     async resolve (_parent, _args, context) {
       return await context.prisma.products.findUnique({
         where: {
           name: _parent.name
         }
       })
       .image()
     }
    })
    t.field('productCategory', {
      type: ProductCategory,
      async resolve (_parent, _args, context) {
        return await context.prisma.products.findUnique({
          where: {
            id: _parent.id
          }
        })
        .productCategory()
      }
    })
  }
})

export const ProductsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('products', {
      type: 'Product',
      resolve(_parent, _args, context) {
        return context.prisma.products.findMany()
      }
    })
  }
})