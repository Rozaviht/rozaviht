import { objectType, extendType } from 'nexus'
import { Article } from './Article'

export const ArticleCategory = objectType({
  name: 'ArticleCategory',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.list.field('articles', {
      type: Article,
      async resolve(_parent, _args, contenxt) {
        return await contenxt.prisma.articles.findMany({
          where: {
            categoryId: _parent.id
          }
        })
      }
    })
  }
})


export const ArticleCategoriesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('getArticlesCategories', {
      type: 'ArticleCategory',
      resolve(_parent, _args, context) {
        return context.prisma.article_categories.findMany()
      }
    })
  }
})