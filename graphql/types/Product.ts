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
    t.nonNull.string('imageId')
    t.nonNull.string('productCategoryId')
    t.field('image', {
      type: Image,
     async resolve (_parent, _args, context) {
       return await context.prisma.images.findUnique({
         where: {
           id: _parent.imageId
         }
       })
     }
    })
    t.field('productCategory', {
      type: ProductCategory,
      async resolve (_parent, _args, context) {
        return await context.prisma.product_categories.findUnique({
          where: {
            id: _parent.productCategoryId
          }
        })
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