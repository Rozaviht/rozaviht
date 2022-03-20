import Image from 'next/image'
import { useContext } from 'react'

import { AppContext } from 'services/AppContext'

import type { Dispatch, SetStateAction } from 'react'
import type { shippingDataProps } from "pages/checkout"
import type { CartItemType } from 'services/AppProvider'

import provinciasData from "../lib/data/pronviciasData.json"
import municipiosData from "../lib/data/municipiosData.json"

import aceite10 from '@img/aceite10-concaja.png'

export type provinciasDataProps = [{
  nombre: string,
  provincia_id: string
}]

export type municipiosDataProps = [{
  nombre: string,
  provincia_id: string,
  municipio_id: string,
  cmun: string,
  dc: string,
}]

export type checkoutVerificationProps = {
  shippingData: shippingDataProps,
  setOrderVerified: Dispatch<SetStateAction<boolean>>
}

export default function CheckoutVerify ({shippingData, setOrderVerified}:checkoutVerificationProps) {

  const { cartProducts, setCartProducts, totalCartPrice } = useContext(AppContext)

  const incrementAmount = (clickedItem: CartItemType) => {
    setCartProducts(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  
  const decrementAmount = (clickedItem: CartItemType) => {
    setCartProducts(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id && item.amount > 1
            ? { ...item, amount: item.amount - 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  return (
    <div className="checkout-section">
      <div className="checkout-data-card">
        <h2 className="font-LoraMedium">Datos de envío</h2>
        <div className="checkout-shippingdata">
          <p>{`${shippingData.name}, ${shippingData.lastname}`}</p>
          <p>{shippingData.mail}</p>
          <p>{shippingData.phone}</p>
        </div>
        <div className="checkout-shippingdata">
          <p>{provinciasData.filter(provincia =>
            shippingData.provincie === provincia.provincia_id
            ).map(provincia => provincia.nombre)}</p>
          <p>{`${municipiosData.filter(municipio =>
            shippingData.municipie === municipio.municipio_id
            ).map(municipio => municipio.nombre)} ${shippingData.postalcode}`}</p>
          <p>{`${shippingData.street}, ${shippingData.streetnumber}`}</p>
          <p>{shippingData.doordetails}</p>
          <p>{shippingData.shippingcomments}</p>
        </div>
      </div>
      <div className="checkout-order">
        <h2 className="font-LoraMedium">Pedido</h2>
        {cartProducts.map(cartProduct => 
          <div key={cartProduct.id} className="checkout-product-card">
            <p className="checkout-product-name">{cartProduct.name}</p>
            <div className="checkout-product-img">
              <Image src={aceite10} height={100} width={100} layout="responsive" />
            </div>
              <p className="checkout-product-price">{`${cartProduct.price*cartProduct.amount},00€`}</p>
              <div className="amount--cart checkout-product-amount">
                <button className="amount-bt--cart bt--minus" onClick={()=>decrementAmount(cartProduct)}>-</button>
                <input className="amount-input--cart" type="number" value={cartProduct.amount} disabled="disabled"/>
                <button className="amount-bt--cart bt--plus" onClick={()=>incrementAmount(cartProduct)}>+</button>
              </div>
          </div>
          )}
          <p>{`Total: ${totalCartPrice},00€`}</p>
      </div>
      <button className="checkoutform-bt" onClick={() => setOrderVerified(true)} >Pagar</button>
    </div>
  )
}