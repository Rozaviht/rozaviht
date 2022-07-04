export async function sendSubMail (email: string) {
  
  const sgMail = require('@sendgrid/mail')

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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