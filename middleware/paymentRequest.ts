const TPV_MERCHANT_KEY  = process.env.TPV_MERCHANT_KEY
const DEVELOPMENT_MERCHANTIP  = process.env.DEVELOPMENT_MERCHANTIP

import { FieldResolver } from "nexus"

export const paymentRequest: FieldResolver<
  'Mutation',
  'paymentRequest'
> = async (_, {orderAmount, billingForm, orderNumber}) => {

  var cryptojs = require('crypto-js')

  var amountString = orderAmount.toString().split('.').join("")

  if (orderAmount % 1 === 0) {
    amountString = `${amountString}00`
  } else {
    amountString = `${amountString}0`
  }

  console.log(orderNumber)
  console.log(orderAmount)

  var merchantData = {
    DS_MERCHANT_AMOUNT: amountString,
    DS_MERCHANT_CURRENCY: "978",
    DS_MERCHANT_MERCHANTCODE: "356725135",
    DS_MERCHANT_ORDER: orderNumber, 
    DS_MERCHANT_TERMINAL: "1",
    DS_MERCHANT_TRANSACTIONTYPE: "0",
    DS_MERCHANT_MERCHANTURL: "http://rozaviht.com/api/paymentresponse",
    DS_MERCHANT_URLOK: "http://rozaviht.com/checkoutend",
    DS_MERCHANT_URLKO: "http://rozaviht.com/checkout",
    DS_MERCHANT_EMV3DS: {
      threeDSInfo: "ChallengeResponse",
      protocolVersion: "2.2.0",
      browserAcceptHeader: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/json",
			browserUserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
      browserLanguage: "ES-es",
      browserJavaEnabled: "true",
      cardholderName: `${billingForm?.name} ${billingForm?.lastName}`,
      Email: billingForm?.email,
      mobilePhone: {
        cc: "34",
        subscriber: billingForm?.phone
      },
      billAddrState: billingForm?.provincie,
      billAddrCity: billingForm?.city,
      billAddrPostCode: billingForm?.postalcode,
      billAddrLine1: `${billingForm?.address} ${billingForm?.addressNumber}`,
      billAddrLine2: `${billingForm?.door}`
    }
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