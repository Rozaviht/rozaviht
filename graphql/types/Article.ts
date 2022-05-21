import { objectType, extendType } from "nexus";
import { Image } from "./Image";
import { ArticleCategory } from "./ArticleCategory";

export const Article = objectType({
  name: 'Article',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('title')
    t.nonNull.string('content')
    t.nonNull.boolean('published')
    t.nonNull.string('categoryId')
    t.field('images', {
      type: Image,
      async resolve(_parent, _args, context) {
        return await context.prisma.images.findUnique({
          where: {
            articleId: _parent.id
          }
        })
      }
    })
    t.field('category', {
      type: ArticleCategory,
      async resolve(_parent, _args, context) {
        return await context.prisma.article_categories.findUnique({
          where: {
            id: _parent.categoryId
          }
        })
      }
    })
  }
})

export const ArticlesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('getArticles', {
      type: 'Article',
      resolve(_parent, _args, context) {
        return context.prisma.articles.findMany({
          select: {
            id: true,
            title: true,
            content: true,
            published: true,
            categoryId: true
          }
        })
      }
    })
  }
})