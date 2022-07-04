
export const createSendGridSub = async (email: string) => {

  const client = require('@sendgrid/client')
  client.setApiKey(process.env.SENDGRID_API_KEY)

  const data = {
    "contacts": [
      {
        "email": email,
      }
    ]
  };

  const request = {
    url: `/v3/marketing/contacts`,
    method: 'PUT',
    body: data
  }

  client.request(request)
    .then((response: any) => {
      console.log(response.statusCode)
      console.log(response.body)
    })
    .catch((error: any) => {
      console.error(error)
    })
}