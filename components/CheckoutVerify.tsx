import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'

import { AppContext } from 'services/AppContext'
import { CheckoutContext } from 'services/CheckoutContext'
import { orderType } from '../pages/api/sendOrderMail'

import provinciasData from "../data/pronviciasData.json"

import EditIcon from 'public/img/edit-icon.svg'
import Cart from './Cart'
import { gql, useMutation } from '@apollo/client'

import MiniTerms from './MiniTerms'
import MiniPrivacy from './MiniPrivacy'
import useScrollBlock from '@hooks/useScrollBlock'
import BillingDataCard from './BillingDataCard'
import PopUpAlerts from './PopUpAlerts'


const PAYMENT_REQUEST = gql`
  mutation Mutation($orderAmount: Float!, $orderNumber: String!, $billingForm: billingFormInputs) {
    paymentRequest(orderAmount: $orderAmount, orderNumber: $orderNumber, billingForm: $billingForm) {
      Ds_SignatureVersion
      Ds_MerchantParameters
      Ds_Signature
    }
  }
`

const CREATE_ORDER = gql`
  mutation Mutation($orderInputs: orderInputs, $shippingForm: shippingFormInputs, $billingForm: billingFormInputs) {
    createOrder(orderInputs: $orderInputs, shippingForm: $shippingForm, billingForm: $billingForm) {
      success
      orderNumber
    }
  }
`

export default function CheckoutVerify () {

  const { cartProducts, setCartProducts, totalCartPrice, setTotalCartPrice, setShowCart, showCart, setShowPopUp, setPopUpMssg } = useContext(AppContext)
  const { shippingForm, billingForm, setBillingForm, setEditingForm } = useContext(CheckoutContext)

  const [ paymentRequest, {data} ] = useMutation(PAYMENT_REQUEST)
  const [ createOrder, ] = useMutation(CREATE_ORDER)

  const [shippingChecked, setShippingChecked] = useState(true)
  const [checkedBillingForm, setCheckedBillingForm] = useState(true)
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
      customerEmail: shippingForm.email,
      items: cartProducts
    })
  }, [cartProducts || shippingForm])


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

  useEffect(() => {
    if (checkedBillingForm === true) {
      setBillingForm({
        name: shippingForm.name,
        lastName: shippingForm.lastName,
        email: shippingForm.email,
        phone: shippingForm.phone,
        provincie: shippingForm.provincie,
        city: shippingForm.city,
        postalcode: shippingForm.postalcode,
        address: shippingForm.address,
        addressNumber: shippingForm.addressNumber,
        door: shippingForm.door,
        cif: (document as any).getElementById("cifBox").value as string
      })
    }
  },[])


  const handleResysSubmit = (event: any) => {
    event.preventDefault()

    if (checkedTerms === false ) {
      setPopUpMssg(["No se puede realizar la compra ", "Para poder realizar la compra tienes que aceptar nuestros términos."])
      setShowPopUp(true)
      return false

    } else {
      let orderAmount = 0
      if ( shippingChecked === true ) {
        orderAmount = totalCartPrice + 2
      } else {
        orderAmount = totalCartPrice + 3.5
      }

      let orderInputs = {
        amount: orderAmount,
        products: cartProducts.map(cartProduct => cartProduct.name),
        shippingMethod: shippingChecked === true ? "STAN" : "EXPR"
      }



      createOrder({variables: {orderInputs, shippingForm, billingForm}}).then(({data}) => {
        let orderNumber : string = data.createOrder.orderNumber
        paymentRequest({variables: {orderAmount, billingForm, orderNumber}}).then(() => {
          (document as any).redSysForm.submit()
        })
      })

    }
  }

  return (
    <div className="checkoutVerify">
      <div className="checkoutVerify__content">
        <h2 className="font-LoraMedium">Datos de entrega</h2>
        <div className="shippingdata-card">
          <strong>{`${shippingForm.name.toLowerCase().charAt(0).toUpperCase() + shippingForm.name.slice(1).toLowerCase()} ${shippingForm.lastName.toLowerCase().charAt(0).toUpperCase() + shippingForm.lastName.slice(1).toLowerCase()}`}</strong>
          <p style={{ 'marginTop': '2rem' }}>{shippingForm.email}</p>
          <p>{`+34 ${shippingForm.phone}`}</p>
          <p style={{ 'marginTop': '1rem' }}>{`${shippingForm.address} ${shippingForm.addressNumber}, ${shippingForm.door}`}</p>
          <p>{`${shippingForm.city.toUpperCase()} ${provinciasData.filter(provincia =>
              shippingForm.provincie === provincia.provincia_id
              ).map(provincia => provincia.nombre.toUpperCase())}, ${shippingForm.postalcode}`}</p>
          <p>{shippingForm.shippingComment}</p>
          <button className="editIcon" onClick={() => setEditingForm(true)}>
            <EditIcon />
          </button>
        </div>
        <h2 style={{ 'marginTop': '2rem' }}>Dirección de facturación</h2>
        <div className="flexrow flexrow--separate flexrow--algncenter">
          <label htmlFor="sameAddress" className="checkBox">
            <input type="checkbox" name="sameAddress"  checked={checkedBillingForm} onClick={(e) => setCheckedBillingForm((e.target as HTMLInputElement).checked)}/>
            <div/>
          </label>
          <span>Igual que la dirección de entrega</span>
        </div>
        < BillingDataCard checkedCifAddress={checkedBillingForm}/>
        <div className="input-wrapper">
          <label htmlFor="cif" className="checkout-label" >
            <input id='cifBox'  type='text' autoComplete="off" name="cif" placeholder=" " className="checkout-input"/>
            <span className="checkout-labelcontent">Número de Identificación fiscal (Opcional)</span>
          </label>
          <span style={{ 'fontSize': '70%' }}>*Este campo es opcional, para solicitar la factura ampliada con el DNI/NIF/CIF introducido.</span>
        </div>
        <h2 style={{ 'marginTop': '2rem' }}>Método de envío</h2>
        <div className="flexcolum flexcolum--separate">
          <label htmlFor="regularShip" className="shippingCheck">
            <input type='checkbox' name="regularShip" value={'standard_shipping'} className="checkoutVerify__shipping-method" checked={shippingChecked} onClick={() => setShippingChecked(shippingChecked => shippingChecked === true ? shippingChecked : !shippingChecked)}/>
            <div>
              <span className="checkCircle"></span>
              <h4>Entrega Estandar <div style={{ 'width': '35px' }}>< Image src={'https://rozaviht-media.s3.eu-west-3.amazonaws.com/correos-logo.webp'} height={175} width={175} layout="responsive" /></div></h4>
              <p>El tiempo estimado de entrega es de 2 a 5 días hábiles. <strong>2,00€</strong></p>
            </div>
          </label>
          <label htmlFor="expressShip" className="shippingCheck">
            <input type="checkbox" name="expressShip" value={'express_shipping'} className="checkoutVerify__shipping-method" checked={!shippingChecked} onClick={() => setShippingChecked(shippingChecked => shippingChecked === false ? shippingChecked : !shippingChecked)}/>
            <div>
              <span className="checkCircle"></span>
              <h4>Entrega Express <div style={{ 'width': '35px' }}>< Image src={'https://rozaviht-media.s3.eu-west-3.amazonaws.com/correos-logo.webp'} height={175} width={175} layout="responsive" /></div></h4>
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
                <div className="creditCardImg"><Image src={"https://rozaviht-media.s3.eu-west-3.amazonaws.com/visa-logo.webp"} height={265} width={443} alt="Logo de Visa" layout="responsive" /></div>
                <div className="creditCardImg"><Image src={"https://rozaviht-media.s3.eu-west-3.amazonaws.com/mastercard-logo.webp"} height={265} width={443} alt="Logo de Visa" layout="responsive" /></div>
                <div className="creditCardImg"><Image src={"https://rozaviht-media.s3.eu-west-3.amazonaws.com/maestro-logo.webp"} height={268} width={445} alt="Logo de Visa" layout="responsive" /></div>
              </div>
            </div>
          </label>
        </div>
      </div>
      <div className="checkoutVerify__content">
        <PopUpAlerts />
        <h2>Resumen pedido</h2>
        <div className="flexrow flexrow--nopd flexrow--between">
          <p>{`${cartProducts.length} ${cartProducts.length > 1 ? 'artículos' : 'artículo'}`}</p>
          <span style={{ 'color': '#9b532b', 'cursor': 'pointer', 'fontWeight': '600', 'textDecoration': 'underline' }} onClick={() => setShowCart(!showCart)} >Ver tu cesta de la compra</span>
          < Cart ifCheckout={true} />
        </div>
        <div className="checkoutVerify__price">
          <h2>Total <span>{`${(totalCartPrice + (shippingChecked === true ? 2 : 3.5)).toFixed(2)}€`}</span></h2>
          <p>Subtotal <span>{`${subTotalCartPrice.toFixed(2)}€`}</span></p>
          <p>Iva <span>{`${iva.toFixed(2)}€`}</span></p>
          <p>Costos de envío <span>{shippingChecked === true ? '2,00€' : '3,50€'}</span></p>
        </div>
        <form action="https://sis.redsys.es/sis/realizarPago" name="redSysForm" method='POST'>
          <input type="hidden" name="Ds_SignatureVersion" value={data === undefined ? "" : data.paymentRequest.Ds_SignatureVersion} />
          <input type="hidden" name="Ds_MerchantParameters" value={data === undefined ? "" : data.paymentRequest.Ds_MerchantParameters} />
          <input type="hidden" name="Ds_Signature" value={data === undefined ? "" : data.paymentRequest.Ds_Signature} />
        </form>
        <button className="checkoutform-bt checkoutform-bt--fixed" type='button' onClick={handleResysSubmit}>Pagar</button>
        <div className="flexrow flexrow--separate flexrow--algncenter flexrow--nopd">
          <label htmlFor="termsChecked" className="checkBox">
            <input type="checkbox" name="termsChecked"  checked={checkedTerms} onClick={(e) => setCheckedTerms((e.target as HTMLInputElement).checked)}/>
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