const SENDGRID_API_KEY  = process.env.SENDGRID_API_KEY 


export async function postSub (email: string) {
  console.log('ENVIANDO EMAIL DE SENDGRID')

  const sgMail = require('@sendgrid/mail')

  sgMail.setApiKey(SENDGRID_API_KEY)

  const mailOptions = {
    to: email,
    from:  'no-rply@rozaviht.com',
    template_id: 'd-5bfbf963fd5e4f14ba6b2e2ba717d24a'
  }

  await sgMail.send(mailOptions)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })
}