import { NextApiRequest, NextApiResponse } from "next";
const TPV_MERCHANT_KEY  = process.env.TPV_MERCHANT_KEY 

export default function handler(req: NextApiRequest,res: NextApiResponse) {
  
    res.redirect(307, '/checkout')

}