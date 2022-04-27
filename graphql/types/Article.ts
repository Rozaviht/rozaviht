import { objectType, extendType } from "nexus";
import { Image } from "./Image";
import { ArticleCategory } from "./ArticleCategory";

export const Article = objectType({
  name: 'Article',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('title')!
    t.nonNull.string('content')!
    t.nonNull.boolean('published')!
    t.list.field('images', {
      type: Image,
      async resolve(_parent, _args, context) {
        return await context.prisma.articles.findUnique({
          where: {
            id: _parent.id,
          }
        })
        .image()
      }
    })
    t.list.field('categories', {
      type: ArticleCategory,
      async resolve(_parent, _args, context) {
        return await context.prisma.articles.findUnique({
          where: {
            id: _parent.id
          }
        })
        .categories()
      }
    })
  }
})

export const ArticlesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('articles', {
      type: 'Article',
      resolve(_parent, _args, context) {
        return context.prisma.articles.findMany()
      }
    })
  }
})