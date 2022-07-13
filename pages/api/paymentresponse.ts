import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma"
import { sendOrderMail } from '../../utils/sendOrderMail'
import { dateOptions } from "pages/rozanews";

export default async function handler(req: NextApiRequest,res: NextApiResponse) {

  var cryptojs = require('crypto-js')

    
  if (req.method === 'POST') {

    const merchantParams = req.body.Ds_MerchantParameters || req.body.DS_MERCHANTPARAMETERS;
    const signature = req.body.Ds_Signature || req.body.DS_SIGNATURE;

    //Decode merchantParams in Base 64 to JSON object
    const merchantParamsDecoded = JSON.parse(cryptojs.enc.Base64.parse(merchantParams).toString(cryptojs.enc.Utf8))

    //Decode key
    var keyWordArray = cryptojs.enc.Base64.parse(process.env.TPV_MERCHANT_KEY_ENV)

    var iv = cryptojs.enc.Hex.parse("0000000000000000")
    var cipher = cryptojs.TripleDES.encrypt(merchantParamsDecoded.Ds_Order, keyWordArray, {
      iv:iv,
      mode: cryptojs.mode.CBC,
      padding: cryptojs.pad.ZeroPadding
    }) 


    // Sign
    var signatureBase64 = cryptojs.HmacSHA256(merchantParams, cipher.ciphertext).toString(cryptojs.enc.Base64);

    const dsResponse = parseInt(merchantParamsDecoded.Ds_Response || merchantParamsDecoded.DS_RESPONSE, 10); 


    const  merchantSignatureIsValid = (signA: string, signB: string) => {
      return cryptojs.enc.Base64.parse(signA).toString()
       === cryptojs.enc.Base64.parse(signB).toString();
    }

    const orderNumber = await prisma.order_number.findUnique({
      where: {
        number: merchantParamsDecoded.Ds_Order 
      }
    })
    console.log( cryptojs.enc.Base64.parse(signature).toString())
    console.log( cryptojs.enc.Base64.parse(signatureBase64).toString())
    console.log(merchantSignatureIsValid(signature, signatureBase64))

    if (merchantSignatureIsValid(signature, signatureBase64) && dsResponse > -1 && dsResponse < 100) {
      //TPV payment is OK
      //Change paymentStatus in order
      await prisma.order_details.update({
        where: {
          orderNumberId: orderNumber!.id
        },
        data: {
          paymentStatus: "COMP"
        }
      })

      const orderDetails = await prisma.order_details.findUnique({
        where: {
          orderNumberId: orderNumber!.id,
        },
        select: {
          createdAt: true,
          amount: true,
          products: {
            select: {
              amount: true,
              product: {
                select: {
                  name: true,
                  price: true,
                  image: true,
                }
              }
            }
          },
          billingInfo: {
            select: {
              name: true,
              email: true,
            }
          },
          shippingDetails: {
            select: {
              shippingMode: true
            }
          }
        }
      })

      const orderDetailsCleaned = {
        amount: orderDetails?.amount,
        items: orderDetails?.products,
        customerEmail: orderDetails?.billingInfo.email,
        customerName: orderDetails?.billingInfo.name,
        date: orderDetails?.createdAt.toLocaleDateString('es-ES', dateOptions),
        shippingCosts: orderDetails?.shippingDetails.shippingMode === 'STAN' ? "Envío Estandar -  2€" : "Envío Express - 3€"
      }

      await sendOrderMail(orderDetailsCleaned)

      return res.status(200).end("Payment OK, email sended")

    } else {
      //TPV payment is KO
      //Change paymentStatus in order
      await prisma.order_details.update({
        where: {
          orderNumberId: orderNumber!.id
        },
        data: {
          paymentStatus: "FAIL"
        }
      })


      return res.status(200).end("Payment KO")
    }
  

  } else {
    return res.status(500).json("Method not allowed")
  }

}