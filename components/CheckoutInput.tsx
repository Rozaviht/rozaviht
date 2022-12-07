import { ErrorMessage, Field, FormikErrors } from "formik";

interface CheckoutInputProps {
  inputName: string
  inputPlaceHolder: string
  inputType: string
  errors: FormikErrors<{
    name: string;
    lastName: string;
    email: string;
    phone: string;
    cif: string;
    provincie: string;
    city: string;
    postalcode: string;
    address: string;
    addressNumber: string;
    door: string;
    shippingComment: string;
}>
}

export default function CheckoutInput ({errors, inputName, inputPlaceHolder}: CheckoutInputProps) {

  const readObjProp = (obj: any, prop: string) => {
    return obj[prop]
  }

  const error = readObjProp(errors, inputName)


  return (
    <div className="input-wrapper">
      <label htmlFor={inputName} className="checkout-label" >
        <Field  type='text' autoComplete="off" name={inputName} placeholder=" " className={error ? "checkout-input checkout-input--error" : "checkout-input"}/>
        <span className="checkout-labelcontent">{inputPlaceHolder}</span>
      </label>
      { inputName === 'email' ? 
        <span className="note-span">*Este email solo se usará con el motivo de enviarte la confirmación y nº de pedido.</span> : <></>}
      { inputName === 'cif' ? 
        <span className="note-span">*Este campo es opcional, para solicitar la factura ampliada con el DNI/NIF/CIF introducido.</span> : <></>}
      <ErrorMessage name={inputName} component={'span'} className="checkout-input-errmssg" />
    </div>
  )
}