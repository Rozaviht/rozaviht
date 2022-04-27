export const resolvers = {
  Query: {
    images: (_parent, _args, context) => {
      return context.prisma.images.findMany()
    },
    articles: (_parent, _args, context) => {
      return context.prisma.articles.findMany()
    },
    products: (_parent, _args, context) => {
      return context.prisma.products.findMany()
    },
    productCategories: (_parent, _args, context) => {
      return context.prisma.product_categories.findMany()
    },
    articlesCategories: (_parent, _args, context) => {
      return context.prisma.article_categories.findMany()
    }
  }
}