import { NextApiRequest, NextApiResponse } from "next";
const TPV_MERCHANT_KEY  = process.env.TPV_MERCHANT_KEY
import prisma from "lib/prisma"
import { sendOrderMail } from '../../utils/sendOrderMail'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {

  var cryptojs = require('crypto-js')

    
  if (req.method === 'POST') {

    const merchantParams = req.body.Ds_MerchantParameters || req.body.DS_MERCHANTPARAMETERS;
    const signature = req.body.Ds_Signature || req.body.DS_SIGNATURE;

    //Decode merchantParams in Base 64 to JSON object
    const merchantParamsDecoded = JSON.parse(cryptojs.enc.Base64.parse(merchantParams).toString(cryptojs.enc.Utf8))

    //Decode key
    var keyWordArray = cryptojs.enc.Base64.parse(TPV_MERCHANT_KEY)

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

    if (merchantSignatureIsValid(signature, signatureBase64) && dsResponse > -1 && dsResponse < 100) {
      //TPV payment is OK

    } else {
      //TPV payment is KO
      return res.status(200).end("Payment KO")
    }



    return res.status(200).json(merchantSignatureIsValid(signature, signatureBase64))


  

  } else {
    return res.status(500).json("Method not allowed")
  }

}