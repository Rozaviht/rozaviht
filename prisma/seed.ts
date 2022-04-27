import { PrismaClient } from '@prisma/client'
import { articles } from '../data/articlesData'
import { articlesCategories } from '../data/articlesData'
import { products } from '../data/productsData'
import { productsCategories } from '../data/productsData'
import { images } from '../data/imagesData'


const prisma = new PrismaClient()

const load = async () => {
  await prisma.products.deleteMany()
  console.log("Deleted records in product table")

  await prisma.product_categories.deleteMany()
  console.log("Deleted records in product_categories table")

  await prisma.articles.deleteMany()
  console.log("Deleted records in article table")

  await prisma.article_categories.deleteMany()
  console.log("Deleted records in article_categories table")
  
  await prisma.images.deleteMany()
  console.log("Deleted records in article table")



  await prisma.product_categories.create({
    data: productsCategories
  })
  console.log("Added product category data")


/*   await Promise.all(
    products.map(async (product) => {
      prisma.products.create({
        data: {
          name: product.name,
          price: product.price,
          productCategory: {
            connect: {
              id: 1
            }
          },
          image: {
            connect: {
              id: product.id
            }
          }
        }
      })
    })
  )
  console.log("Added products data") */


  await prisma.images.createMany({
    data: images
  })
  console.log("Added images data")


  await prisma.articles.createMany({
    data: articles
  })
  console.log("Added articles data")


  await prisma.article_categories.createMany({
    data: articlesCategories
  })
  console.log("Added articles_categories data")




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