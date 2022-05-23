const SENDGRID_API_KEY  = process.env.SENDGRID_API_KEY 

export type mailContentType = {
  subject: string
  orderNumber?: string | null | undefined
  name: string
  mail: string
  message: string
} | null | undefined

export async function sendContactMail (mailContent: mailContentType) {
  
  const sgMail = require('@sendgrid/mail')

  sgMail.setApiKey(SENDGRID_API_KEY)

  const mailOptions = {
    to: 'consultascliente@rozaviht.com',
    from:  'no-rply@rozaviht.com',
    subject: mailContent!.subject,
    content: [{
      type: "text/html",
      value: `<h1>Email de parte de: ${mailContent!.name}</h1></br ><p>MENSAJE: ${mailContent!.message}</p></br ><p>Número de pedido: ${mailContent!.orderNumber}</p></br ><strong>Responder email a: ${mailContent!.mail}</strong>`
    }]
  }

  await sgMail.send(mailOptions)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })
}