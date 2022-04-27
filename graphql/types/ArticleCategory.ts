import { objectType } from 'nexus'
import { Article } from './Article'

export const ArticleCategory = objectType({
  name: 'ArticleCategory',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.list.field('articles', {
      type: Article,
      async resolve(_parent, _args, contenxt) {
        return await contenxt.prisma.article_categories.findUnique({
          where: {
            id: _parent.id
          }
        })
        .articles()
      }
    })
  }
})