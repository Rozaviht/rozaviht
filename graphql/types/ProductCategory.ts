import { extendType, objectType } from "nexus";
import { Product } from "./Product";
import { Image } from "./Image";

export const ProductCategory = objectType({
  name: 'ProductCategory',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.list.field('products', {
      type: Product,
      async resolve (_parent, _args, context) {
        return await context.prisma.product_categories.findUnique({
          where: {
            id: _parent.id
          }
        })
        .products()
      }
    })
    t.list.field('images', {
      type: Image,
      async resolve(_parent, _args, context) {
        return await context.prisma.product_categories.findUnique({
          where: {
            id: _parent.id
          }
        })
        .images()
      }
    })
  }
})


export const ProductCategoriesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('getProductsCategories', {
      type: 'ProductCategory',
      resolve(_parent, _args, context) {
        return context.prisma.product_categories.findMany()
      }
    })
  }
})