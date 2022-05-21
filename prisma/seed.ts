import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const load = async () => {
/*   await prisma.products.deleteMany()
  console.log("Deleted records in product table")

  await prisma.product_categories.deleteMany()
  console.log("Deleted records in product_categories table")
  */

  await prisma.articles.deleteMany()
  console.log("Deleted records in article table")

  await prisma.article_categories.deleteMany()
  console.log("Deleted records in article_categories table")
  
  await prisma.images.deleteMany()
  console.log("Deleted records in article table") 



/*   await prisma.product_categories.create({
    data: productsCategories
  })
  console.log("Added product category data") */


/*   for ( let i=0; i<products.length -1; i++ ) {
    await prisma.products.create({
      data: {
        name: products[i].name,
        price: products[i].price,
        productCategory: {
          connect: {
            id: 
          }
        }
      }
    })
  } */
/*   console.log("Added products data") */

 /*  await prisma.article_categories.createMany({
    data: articlesCategories
  })
  console.log("Added articles_categories data") */


/*   for ( let i=0; i < articles.length - 1; i++ ) {
    await prisma.articles.create({
      data: {
        title: articles[i].title,
        content: articles[i].content,
        category: {
          connect: {
            id: articles[i].categoryId
          }
        }
      }
    })
  }
  console.log("Added articles data") */







}

load()
  .catch(e => {
    console.error(`There was an error while seeding: ${e}`)
    process.exit(1)
  })
  .finally(async () => {
    console.log("Succesfully seeded database. Closing connection.")
    await prisma.$disconnect()
  })