const TPV_MERCHANT_KEY  = process.env.TPV_MERCHANT_KEY 
import prisma from 'lib/prisma'

import { FieldResolver } from "nexus"

export const paymentRequest: FieldResolver<
  'Mutation',
  'paymentRequest'
> = async (_, {orderAmount}) => {

  var cryptojs = require('crypto-js')

  var amountString = orderAmount.toString().split('.').join("")

  if (amountString.length === 2) {
    amountString = `${amountString}00`
  }

  if (amountString.length === 3) {
    amountString = `${amountString}0`
  }

  const orderNumber = await prisma.order_number.findMany()

  var merchantData = {
    DS_MERCHANT_AMOUNT: amountString,
    DS_MERCHANT_CURRENCY: "978",
    DS_MERCHANT_MERCHANTCODE: "355542226",
    DS_MERCHANT_ORDER: `10${orderNumber.length.toString().padStart(7, "0")}`, 
    DS_MERCHANT_TERMINAL: "1",
    DS_MERCHANT_TRANSACTIONTYPE: "0",
    DS_MERCHANT_MERCHANTURL: "http://rozaviht.vercel.app/api/graphql"
  }

  // Base64 encoding of parameters
  var merchantWordArray = cryptojs.enc.Utf8.parse(JSON.stringify(merchantData))
  var merchantBase64 = merchantWordArray.toString(cryptojs.enc.Base64)

    // Decode key
  var keyWordArray = cryptojs.enc.Base64.parse(TPV_MERCHANT_KEY);

  // Generate transaction key
  var iv = cryptojs.enc.Hex.parse("0000000000000000");
  var cipher = cryptojs.TripleDES.encrypt(merchantData.DS_MERCHANT_ORDER, keyWordArray, {
    iv:iv,
    mode: cryptojs.mode.CBC,
    padding: cryptojs.pad.ZeroPadding
  });

  // Sign
  var signature = cryptojs.HmacSHA256(merchantBase64, cipher.ciphertext);
  var signatureBase64 = signature.toString(cryptojs.enc.Base64);

  var tpvResponse = {
    signatureVersion: "HMAC_SHA256_V1",
    merchantParameters: merchantBase64,
    signature: signatureBase64
  }

return {
  Ds_SignatureVersion: tpvResponse.signatureVersion,
  Ds_MerchantParameters: tpvResponse.merchantParameters,
  Ds_Signature: tpvResponse.signature
}

}