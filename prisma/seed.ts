import { PrismaClient } from '@prisma/client'
import { articles } from '../data/articlesData'
import { products } from '../data/productsData'
import { images } from '../data/imagesData'


const prisma = new PrismaClient()

const load = async () => {
  await prisma.products.deleteMany()
  console.log("Deleted records in product table")

  await prisma.product_categories.deleteMany()
  console.log("Deleted records in category table")

  await prisma.articles.deleteMany()
  console.log("Deleted records in article table")

  await prisma.article_main_images.deleteMany()
  console.log("Deleted records in article table")

  await prisma.images.deleteMany()
  console.log("Deleted records in article table")

  await prisma.$queryRaw`ALTER SEQUENCE products_id_seq RESTART WITH 1`
  console.log("reset products_id auto increment to 1")

  await prisma.$queryRaw`ALTER SEQUENCE product_categories_id_seq RESTART WITH 1`
  console.log("reset categories_id auto increment to 1")

  await prisma.$queryRaw`ALTER SEQUENCE articles_id_seq RESTART WITH 1`
  console.log("reset articles_id auto increment to 1")

  await prisma.$queryRaw`ALTER SEQUENCE images_id_seq RESTART WITH 1`
  console.log("reset Images_id auto increment to 1")

  await prisma.$queryRaw`ALTER SEQUENCE article_main_images_id_seq RESTART WITH 1`
  console.log("reset Images_id auto increment to 1")



  await Promise.all(
    products.map(async (product) => {
      prisma.products.create({
        data: {
          name: product.name,
          price: product.price,
          productCategory: {
            connect: {
              id: 1
            }
          }
        }
      })
    })
  )
  console.log("Added products data")


  
  await prisma.product_categories.create({
    data: {
      name: "Aceite de CBD",
      description: "Siente relajación y bienestar al usar nuestro aceite de CBD con aceite de cáñamo. No contiene nada de THC, y es completamente natural y vengano"
    }
  })
  console.log("Added product category data")
  


  await prisma.images.createMany({
    data: images
  })
  console.log("Added images data")


  await prisma.article_main_images.createMany({
    data: {
      imageId: 6
    }
  })

  await Promise.all(
    articles.map(async (article) =>{
      prisma.articles.create({
        data: {
          title: article.title,
          content: article.content,
          mainImage: {
            connect: {
              id: 1
            }
          }
        }
      })
    })
  )
  
  console.log("Added articles data")


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