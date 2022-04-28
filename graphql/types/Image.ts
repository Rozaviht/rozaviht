import { extendType, objectType } from "nexus";
import { Article } from "./Article";
import { Product } from "./Product";
import { ProductCategory } from "./ProductCategory";


export const Image = objectType({
  name: 'Image',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('url')
    t.string('alt')
    t.int('height')
    t.int('width')
    t.string('articleId')
    t.string('productCategoryId')
    t.field('product', {
      type: Product,
      async resolve(_parent, _args, context) {
        return await context.prisma.products.findUnique({
          where: {
            imageId: _parent.id
          }
        })
      }
    })
    t.field('productCategory', {
      type: ProductCategory,
      async resolve(_parent, _args, context) {
        return await context.prisma.product_categories.findUnique({
          where: {
            id: _parent.productCategoryId
          }
        })
      }
    })
    t.field('article', {
      type: Article,
      async resolve(_parent, _args, context) {
        return await context.prisma.articles.findUnique({
          where: {
            id: _parent.articleId
          }
        })
      }
    })
  }
})


export const ImagesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('getImages', {
      type: 'Image',
      resolve(_parent, _args, context) {
        return context.prisma.images.findMany()
      }
    })
  }
})