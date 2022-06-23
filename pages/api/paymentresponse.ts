import { NextApiRequest, NextApiResponse } from "next";
const TPV_MERCHANT_KEY  = process.env.TPV_MERCHANT_KEY 

export default function handler(req: NextApiRequest,res: NextApiResponse) {

    var cryptojs = require('crypto-js')

    console.log(res)


    var keyWordArray = cryptojs.enc.Base64.parse(TPV_MERCHANT_KEY);

    // Generate transaction key
    var iv = cryptojs.enc.Hex.parse("0000000000000000");
    var decryptedMess = cryptojs.TripleDES.decrypt(res, keyWordArray, {
      iv:iv,
      mode: cryptojs.mode.CBC,
      padding: cryptojs.pad.ZeroPadding
    }).toString();

    console.log(decryptedMess)
  
    res.redirect(307, '/checkout')

}