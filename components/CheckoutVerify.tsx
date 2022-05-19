import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'

import { AppContext } from 'services/AppContext'
import { CheckoutContext } from 'services/CheckoutContext'
import { orderType } from '../pages/api/sendOrderMail'

import type { Dispatch, SetStateAction } from 'react'

import provinciasData from "../data/pronviciasData.json"

import EditIcon from '@img/edit-icon.svg'
import Cart from './Cart'
import { gql, useMutation } from '@apollo/client'

import MiniTerms from './MiniTerms'
import MiniPrivacy from './MiniPrivacy'
import useScrollBlock from '@hooks/useScrollBlock'

export type checkoutVerificationProps = {
  setOrderVerified: Dispatch<SetStateAction<boolean>>,
}

const PAYMENT_REQUEST = gql`
  mutation Mutation($totalCartPrice: Float!) {
    paymentRequest(totalCartPrice: $totalCartPrice) {
      Ds_SignatureVersion
      Ds_MerchantParameters
      Ds_Signature
    }
  }
`

export default function CheckoutVerify ({ setOrderVerified }:checkoutVerificationProps) {

  const { cartProducts, totalCartPrice, setTotalCartPrice, setShowCart, showCart } = useContext(AppContext)
  const { checkoutFormData, setEditingForm } = useContext(CheckoutContext)

  const [ paymentRequest, {data} ] = useMutation(PAYMENT_REQUEST)

  const [checked, setChecked] = useState(true)
  const [checkedCifAddress, setCheckedCifAddress] = useState(true)
  const [checkedTerms, setCheckedTerms] = useState(true)

  const [showTerms, setShowTerms] = useState([false, false])

  const subTotalCartPrice = totalCartPrice / 1.21
  const iva = totalCartPrice - subTotalCartPrice

  const [orderDetails, setOrderDetails] = useState<orderType>({} as orderType)

  const [blockScroll, allowScroll] = useScrollBlock()

  useEffect(() => {
    if (showTerms[0] === true || showTerms[1] === true) {
      blockScroll()
    }
    else {
      allowScroll()
    }
  }, [showTerms])

  useEffect(() => {
    setOrderDetails({
      totalPrice: totalCartPrice,
      subtotalPrice: subTotalCartPrice,
      iva: iva,
      customerEmail: checkoutFormData.email,
      items: cartProducts
    })
  }, [cartProducts || checkoutFormData])

  useEffect(() => {
    paymentRequest({variables: {totalCartPrice}})
    console.log(data)
  }, [totalCartPrice])

  const handleShowMiniTerms = (index:number) => {
    let showTermsCopy = [...showTerms]
    
    if (index === 0) {
      showTermsCopy[index] = !showTerms[index]
      showTermsCopy[1] = false
    } else {
      showTermsCopy[index] = !showTerms[index]
      showTermsCopy[0] = false
    }

    setShowTerms(showTermsCopy)
  }

  return (
    <div className="checkoutVerify">
      <div className="checkoutVerify__content">
        <h2 className="font-LoraMedium">Datos de entrega</h2>
        <div className="checkoutVerify__shippingdata">
          <strong>{`${checkoutFormData.name} ${checkoutFormData.lastName}`}</strong>
          <p style={{ 'marginTop': '2rem' }}>{checkoutFormData.email}</p>
          <p>{`+34 ${checkoutFormData.phone}`}</p>
          <p style={{ 'marginTop': '1rem' }}>{`${checkoutFormData.address} ${checkoutFormData.addressNumber}, ${checkoutFormData.door}`}</p>
          <p>{`${checkoutFormData.city.toUpperCase()} ${provinciasData.filter(provincia =>
              checkoutFormData.provincie === provincia.provincia_id
              ).map(provincia => provincia.nombre.toUpperCase())}, ${checkoutFormData.postalcode}`}</p>
          <p>{checkoutFormData.shippingComment}</p>
          <button className="editIcon" onClick={() => setEditingForm(true)}>
            <EditIcon />
          </button>
        </div>
        <h2 style={{ 'marginTop': '2rem' }}>Dirección de facturación</h2>
        <div className="flexrow flexrow--separate flexrow--algncenter">
          <label htmlFor="sameAddress" className="checkBox">
            <input type="checkbox" name="sameAddress"  checked={checkedCifAddress} onClick={(e) => setCheckedCifAddress(e.target.checked)}/>
            <div/>
          </label>
          <span>Igual que la dirección de entrega</span>
        </div>
        <div className="input-wrapper">
          <label htmlFor="cif" className="checkout-label" >
            <input  type='text' autoComplete="off" name="cif" placeholder=" " className="checkout-input"/>
            <span className="checkout-labelcontent">Número de Identificación fiscal (Opcional)</span>
          </label>
          <span style={{ 'fontSize': '70%' }}>*Este campo es opcional, para solicitar la factura ampliada con el DNI/NIF/CIF introducido.</span>
        </div>
        <h2 style={{ 'marginTop': '2rem' }}>Método de envío</h2>
        <div className="flexcolum flexcolum--separate">
          <label htmlFor="regularShip" className="shippingCheck">
            <input type='checkbox' name="regularShip" value={'standard_shipping'} className="checkoutVerify__shipping-method" checked={checked} onClick={(e) => setChecked(e.target.checked)}/>
            <div>
              <span className="checkCircle"></span>
              <h4>Entrega Estandar <div style={{ 'width': '35px' }}>< Image src={'/img/correos-logo.png'} height={175} width={175} layout="responsive" /></div></h4>
              <p>El tiempo estimado de entrega es de 2 a 5 días hábiles. <strong>2,00€</strong></p>
            </div>
          </label>
          <label htmlFor="expressShip" className="shippingCheck">
            <input type="checkbox" name="expressShip" value={'express'} className="checkoutVerify__shipping-method" checked={!checked} onClick={(e) => setChecked(!e.target.checked)}/>
            <div>
              <span className="checkCircle"></span>
              <h4>Entrega Express <div style={{ 'width': '35px' }}>< Image src={'/img/correos-logo.png'} height={175} width={175} layout="responsive" /></div></h4>
              <p>El tiempo estimado de entrega es de 1 a 3 días hábiles. <strong>3,50€</strong></p>
            </div>
          </label>
        </div>
        <h2 style={{ 'marginTop': '2rem' }}>Método de pago</h2>
        <div className="flexcolum flexcolum--separate">
          <label htmlFor="regularShip" className="shippingCheck">
            <input type='checkbox' name="regularShip" className="checkoutVerify__shipping-method" checked/>
            <div>
              <span className="checkCircle"></span>
              <h4>Tarjeta de Crédito</h4>
              <div className="flexrow flexrow--separateall flexrow--nopd">
                <div className="creditCardImg"><Image src={"/img/visa-logo.png"} height={265} width={443} alt="Logo de Visa" layout="responsive" /></div>
                <div className="creditCardImg"><Image src={"/img/mastercard-logo.png"} height={265} width={443} alt="Logo de Visa" layout="responsive" /></div>
              </div>
            </div>
          </label>
          <span style={{ 'fontSize': '70%', 'opacity': '70%' }}>*Actualmente solo disponemos de un método de pago, en un próximo fúturo añadiremos PayPal</span>
        </div>
      </div>
      <div className="checkoutVerify__content">
        <h2>Resumen pedido</h2>
        <div className="flexrow flexrow--nopd flexrow--between">
          <p>{`${cartProducts.length} ${cartProducts.length > 1 ? 'artículos' : 'artículo'}`}</p>
          <span style={{ 'color': '#9b532b', 'cursor': 'pointer', 'fontWeight': '600', 'textDecoration': 'underline' }} onClick={() => setShowCart(!showCart)} >Ver tu cesta de la compra</span>
          < Cart ifCheckout={true} />
        </div>
        <div className="checkoutVerify__price">
          <h2>Total <span>{`${(totalCartPrice + (checked === true ? 2 : 3.5)).toFixed(2)}€`}</span></h2>
          <p>Subtotal <span>{`${subTotalCartPrice.toFixed(2)}€`}</span></p>
          <p>Iva <span>{`${iva.toFixed(2)}€`}</span></p>
          <p>Costos de envío <span>{checked === true ? '2,00€' : '3,50€'}</span></p>
        </div>
        <form action="https://sis-t.redsys.es:25443/sis/realizarPago" method='POST'>
          <input type="hidden" name="Ds_SignatureVersion" value={data === undefined ? '' : data.paymentRequest.Ds_SignatureVersion} />
          <input type="hidden" name="Ds_MerchantParameters" value={data === undefined ? '': data.paymentRequest.Ds_MerchantParameters} />
          <input type="hidden" name="Ds_Signature" value={data === undefined ? '' : data.paymentRequest.Ds_Signature} />
          <button className="checkoutform-bt" type='submit' value={'Submit'} >Pagar</button>
        </form>
        <div className="flexrow flexrow--separate flexrow--algncenter flexrow--nopd">
          <label htmlFor="termsChecked" className="checkBox">
            <input type="checkbox" name="termsChecked"  checked={checkedTerms} onClick={(e) => setCheckedTerms(e.target.checked)}/>
            <div/>
          </label>
          <span style={{ 'maxWidth': '650px'}}>Al realizar un compra, confirmas que has leido y aceptado los <span className="spanTerms" onClick={() => handleShowMiniTerms(0)} >Términos y condiciones</span> y nuestra <span className="spanTerms" onClick={() => handleShowMiniTerms(1)}>Pólitica de Privacidad</span>.</span>
          < MiniTerms showComponent={showTerms[0]} handleShowMiniTerms={handleShowMiniTerms} index={0}/>
          < MiniPrivacy showComponent={showTerms[1]} handleShowMiniTerms={handleShowMiniTerms} index={1}/>
        </div>
      </div>
    </div>
  )
}