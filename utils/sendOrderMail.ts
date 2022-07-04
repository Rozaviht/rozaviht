import { CartItemType } from "services/AppProvider"

const SENDGRID_API_KEY  = process.env.SENDGRID_API_KEY 

export type orderType = {
  items: CartItemType[]
  totalPrice: number
  subtotalPrice: number
  iva: number
  customerEmail: string
}

export type orderItem = {
  productName: string
  productImage: string
  productPrice: string
  productAmount: string
}

export async function sendOrderMail (orderDetails: orderType) {
  
  const sgMail = require('@sendgrid/mail')

  sgMail.setApiKey(SENDGRID_API_KEY)

  const orderItems: orderItem[] = []
  orderDetails.items.forEach( item => orderItems.push({
    productImage: item.image.url,
    productName: item.name,
    productPrice: `${item.price}`,
    productAmount: `${item.amount}`
  })) 

  const mailOptions = {
    to: orderDetails.customerEmail,
    from:  'no-rply@rozaviht.com',
    template_id: 'd-5b7f8dfebfb246f5be1efde4e1662610',
    dynamic_template_data: {
      items: orderItems,
      subtotal: `${orderDetails.subtotalPrice}`,
      iva: `${orderDetails.iva}`,
      shippingCosts: '2,5',
      total: `${orderDetails.totalPrice}`
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