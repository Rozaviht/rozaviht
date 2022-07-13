import { imageType } from "services/AppProvider" 

export type orderType = {
  items: {
    amount: number
    product: {
      name: string
      price: number
      image: imageType
    }}[] | undefined
  amount: bigint | undefined
  customerEmail: string | undefined
  customerName: string | undefined
  date: string | undefined
  shippingCosts: string | undefined
} | null

export type orderItem = {
  productName: string
  productImage: string
  productPrice: string
  productAmount: string
}

export async function sendOrderMail (orderDetails: orderType) {
  
  const sgMail = require('@sendgrid/mail')

  sgMail.setApiKey(process.env.SENDGRID_API_KEY_ENV)

  const orderItems: orderItem[] = []
  orderDetails!.items!.forEach( item => orderItems.push({
    productImage: item.product.image.url.slice(0, -4) + "png",
    productName: item.product.name,
    productPrice: `${item.product.price}`,
    productAmount: `${item.amount}`
  })) 

  const totalPriceCleaned = Number( orderDetails?.amount! / BigInt(1000000))
  const subTotalPrice = totalPriceCleaned / 1.21
  const iva = totalPriceCleaned - subTotalPrice

  const mailOptions = {
    to: orderDetails!.customerEmail,
    from:  'no-rply@rozaviht.com',
    template_id: 'd-5b7f8dfebfb246f5be1efde4e1662610',
    dynamic_template_data: {
      items: orderItems,
      subtotal: `${subTotalPrice}`,
      iva: `${iva}`,
      shippingCosts: orderDetails!.shippingCosts,
      total: `${totalPriceCleaned}`,
      customerName: orderDetails!.customerName,
      datea: orderDetails!.date,
    }
  }

  await sgMail.send(mailOptions)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })
}