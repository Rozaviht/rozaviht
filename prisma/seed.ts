import { PrismaClient } from '@prisma/client'
import { articles } from '../data/articlesData'
import { products } from '../data/productsData'
import { images } from '../data/imagesData'


const prisma = new PrismaClient()

const load = async () => {
  await prisma.productCategories.deleteMany()
  console.log("Deleted records in category table")

  await prisma.products.deleteMany()
  console.log("Deleted records in product table")

  await prisma.articles.deleteMany()
  console.log("Deleted records in article table")

  await prisma.$queryRaw`ALTER SEQUENCE products_id_seq RESTART WITH 1`
  console.log("reset products_id auto increment to 1")

  await prisma.$queryRaw`ALTER SEQUENCE ProductCategories_id_seq RESTART WITH 1`
  console.log("reset categories_id auto increment to 1")

  await prisma.$queryRaw`ALTER SEQUENCE Articles_id_seq RESTART WITH 1`
  console.log("reset articles_id auto increment to 1")

  await prisma.$queryRaw`ALTER SEQUENCE Images_id_seq RESTART WITH 1`
  console.log("reset Images_id auto increment to 1")

  await prisma.products.createMany({
    data: products
  })
  console.log("Added products data")


  
  await prisma.productCategories.create({
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


  await prisma.articleMainImages.createMany({
    data: {
      imageId: 6
    }
  })


  await articles.map((article, index) => (
     prisma.articles.create({
      data: {
        title: article.title,
        mainImageId: index
      }
    })
  ))

  
  console.log("Added articles data")


}

load()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })