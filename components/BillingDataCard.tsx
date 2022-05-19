import { useContext, useEffect, useState } from 'react'
import { CheckoutContext } from 'services/CheckoutContext'

import provinciasData from "../data/pronviciasData.json"

import EditIcon from '@img/edit-icon.svg'
import MiniCheckoutForm from './MiniCheckoutForm'
import useScrollBlock from '@hooks/useScrollBlock'

export default function ShippingDataCard ({checkedCifAddress}: {checkedCifAddress: boolean}) {
  const {  billingForm, setEditingForm } = useContext(CheckoutContext)

  const [showBillingForm, setShowBillingForm] = useState(false)

  const [blockScroll, allowScroll] = useScrollBlock()

  useEffect(() => {
    if (showBillingForm === true) {
      blockScroll()
    }
    else {
      allowScroll()
    }
  }, [showBillingForm])

  return (
    <>
      {billingForm && Object.keys(billingForm).length === 0 && Object.getPrototypeOf(billingForm) === Object.prototype
        ?
        <div className={checkedCifAddress === false ? "shippingdata-card shippingdata-card--empty" : "shippingdata-card shippingdata-card--empty hidden"}>
          <h3>Añade una nueva dirección</h3>
          <button className="editIcon editIcon--relative" onClick={() => setShowBillingForm(true)}>
            <EditIcon />
          </button>
          < MiniCheckoutForm showBillingForm={showBillingForm} setShowBillingForm={setShowBillingForm}/>
        </div>
        :
        <div className={checkedCifAddress === false ? "shippingdata-card" : "shippingdata-card hidden"}>
          <strong>{`${billingForm.name} ${billingForm.lastName}`}</strong>
          <p style={{ 'marginTop': '2rem' }}>{billingForm.email}</p>
          <p>{`+34 ${billingForm.phone}`}</p>
          <p style={{ 'marginTop': '1rem' }}>{`${billingForm.address} ${billingForm.addressNumber}, ${billingForm.door}`}</p>
          <p>{`${billingForm.city.toUpperCase()} ${provinciasData.filter(provincia =>
            billingForm.provincie === provincia.provincia_id
            ).map(provincia => provincia.nombre.toUpperCase())}, ${billingForm.postalcode}`}</p>
          <button className="editIcon" onClick={() => setShowBillingForm(true)}>
            <EditIcon />
          </button>
        </div>
       
      }
    </>
  )
}