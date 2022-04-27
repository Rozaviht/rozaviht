import { objectType } from "nexus";
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