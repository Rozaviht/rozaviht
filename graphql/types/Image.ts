import { objectType } from "nexus";
import { Article } from "./Article";
import { Product } from "./Product";
import { ProductCategory } from "./ProductCategory";


export const Image = objectType({
  name: 'Image',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('url')
    t.string('alt')
    t.string('name')
    t.int('height')
    t.int('width')
    t.field('product', {
      type: Product,
      async resolve(_parent, _args, context) {
        return await context.prisma.images.findUnique({
          where: {
            id: _parent.id,
          }
        })
        .products()
      }
    })
    t.field('productCategory', {
      type: ProductCategory,
      async resolve(_parent, _args, context) {
        return await context.prisma.images.findUnique({
          where: {
            id: _parent.id,
          }
        })
        .product_categories()
      }
    })
    t.field('article', {
      type: Article,
      async resolve(_parent, _args, context) {
        return await context.prisma.images.findUnique({
          where: {
            id: _parent.id
          }
        })
        .articles()
      }
    })
  }
})