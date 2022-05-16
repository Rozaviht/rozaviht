import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'

import { AppContext } from 'services/AppContext'
import { CheckoutContext } from 'services/CheckoutContext'
import useCartActions from '@hooks/useCartActions'
import { orderType } from '../pages/api/sendOrderMail'

import type { Dispatch, SetStateAction } from 'react'

import provinciasData from "../data/pronviciasData.json"
import municipiosData from "../data/municipiosData.json"

import EditIcon from '@img/edit-icon.svg'

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
  setOrderVerified: Dispatch<SetStateAction<boolean>>,
}

export default function CheckoutVerify ({ setOrderVerified }:checkoutVerificationProps) {

  const { cartProducts, totalCartPrice } = useContext(AppContext)
  const { checkoutFormData, setEditingForm } = useContext(CheckoutContext)

  const { incrementAmount, decrementAmount, handleRemoveFromCart } = useCartActions()

  const subTotalCartPrice = totalCartPrice / 1.21
  const iva = totalCartPrice - subTotalCartPrice

  const [orderDetails, setOrderDetails] = useState<orderType>({} as orderType)

  useEffect(() => {
    setOrderDetails({
      totalPrice: totalCartPrice,
      subtotalPrice: subTotalCartPrice,
      iva: iva,
      customerEmail: checkoutFormData.email,
      items: cartProducts
    })
  }, [cartProducts || checkoutFormData])

  return (
    <div className="checkout-section">
      <div className="checkout-data-card">
        <h2 className="font-LoraMedium">Datos de envío</h2>
          <p>{`${checkoutFormData.name}, ${checkoutFormData.lastname}`}</p>
          <p>{checkoutFormData.email}</p>
          <p>{checkoutFormData.phone}</p>
          <p>{checkoutFormData.cif}</p>
          <p style={{ 'marginTop': '1rem' }}>{provinciasData.filter(provincia =>
            checkoutFormData.provincie === provincia.provincia_id
            ).map(provincia => provincia.nombre)}</p>
          <p>{`${municipiosData.filter(municipio =>
            checkoutFormData.municipie === municipio.municipio_id
            ).map(municipio => municipio.nombre)}, ${checkoutFormData.postalcode}`}</p>
          <p>{`${checkoutFormData.street}, ${checkoutFormData.streetnumber}`}</p>
          <p>{checkoutFormData.doordetails}</p>
          <p>{checkoutFormData.shippingcomments}</p>
        <button className="editIcon" onClick={() => setEditingForm(true)}>
          <EditIcon />
        </button>
      </div>
      <div className="checkout-order">
        <h2 className="font-LoraMedium">Pedido</h2>
        {cartProducts.map(cartProduct => 
          <div key={cartProduct.id} className="checkout-product-card">
            <button className="closeBt closeBt--left" onClick={() => handleRemoveFromCart(cartProduct.id)}>
              <div className="closeBt__lineL"></div>
              <div className="closeBt__lineR"></div>
            </button>
            <div>
              <strong className="checkout-product-name">{cartProduct.name}</strong>
              <div className="checkout-product-img">
                <Image src={cartProduct.image.url} height={cartProduct.image.height} width={cartProduct.image.width} alt={cartProduct.image.alt} layout="responsive" />
              </div>
            </div>
            <div>
              <p className="checkout-product-price">{`${cartProduct.price*cartProduct.amount},00€`}</p>
              <div className="amount--cart checkout-product-amount">
                <button className="amount-bt--cart" onClick={()=>decrementAmount(cartProduct)}>-</button>
                <input className="amount-input--cart" type="number" value={cartProduct.amount} disabled={true} />
                <button className="amount-bt--cart" onClick={()=>incrementAmount(cartProduct)}>+</button>
              </div>
            </div>
          </div>
          )}
          <div className="checkout-price-card">
            <p>{`Subtotal: ${subTotalCartPrice.toFixed(2)}€`}</p>
            <p>{`IVA: ${iva.toFixed(2)}€`}</p>
            <p>envío: 2,5€</p>
            <p>{`Total: ${(totalCartPrice + 2.5).toFixed(2)}€`}</p>
          </div>
      </div>
      <button className="checkoutform-bt" >Pagar</button>
    </div>
  )
}