import Layout from "@components/Layout"
import { ErrorMessage, Field, Form, Formik, validateYupSchema, yupToFormErrors, useFormikContext } from "formik"
import { contactMessageRules } from "middleware/validations/contactMessage"
import { ReactElement, useContext, useState } from "react"

import PopUpAlert from '@components/PopUpAlerts'

import { subjects } from "data/contactFormSubjects"
import { AppContext } from "services/AppContext"
import { gql, useMutation } from "@apollo/client"


const SEND_CONTACT_MAIL = gql`
  mutation ValidateSendContactMail($input: contactMessageInputs) {
    validateSendContactMail(input: $input) {
      message
      error
    }
  }
`

export default function ContactPage () {

  const { setPopUpOpen, setPopUpMssg } = useContext(AppContext)

  const [ validateSendContactMail ] = useMutation(SEND_CONTACT_MAIL)

  const [showSubjects, setShowSubjects] = useState(false)

  return (
    <div className="contactPage">
      <div className="contactPage__content">
        <h1>¡Contactanos para cualquier duda que tengas!</h1>
        <h3>Selecciona el asunto del que se trate tu duda y te la resolveremos lo antes posible. Te recomendamos que le eches un vistazo a la página de nuestras preguntas frecuentes antes, por que a lo mejor tu pregunta ya ha sido resuelta.</h3>
      </div>
      <div className="contactPage__content">
        <h2>Esribenos tu duda</h2>
        <Formik
          initialValues={{
            subject: 'ASUNTO DE TU DUDA',
            name: '',
            mail: '',
            orderNumber: '',
            message: ''
          }}
          validationSchema={contactMessageRules}
          validate={values => {
            try {
              validateYupSchema(values, contactMessageRules, true, values)
            } catch (err) {
              return yupToFormErrors(err)
            }
            return {}
          }}
          onSubmit={(values, {setSubmitting}) => {
            const input = values
            validateSendContactMail({variables: {input}})
            .then(({data}) => {
              if (data.validateSendContactMail.error === true) {
                setPopUpMssg(data.validateSendContactMail.message)
                setPopUpOpen(true)
              } else {
                setPopUpMssg(data.validateSendContactMail.message)
                setPopUpOpen(true)
              }
            })
            .catch(err => {
              console.log(err)
            })
          setSubmitting(false)
          }}
        >
          {({
            isSubmitting,
            errors,
            values, 
            setFieldValue
          }) => (
            <Form className="contactForm">
              <div className="input-wrapper">
                  <label htmlFor="subject" className={(values.subject === 'ASUNTO DE TU DUDA') ? "contactForm__subject" : "contactForm__subject selected"}  >
                    <Field  type='hidden' name="subject"/>
                    <span onClick={() => setShowSubjects(!showSubjects)}>{values.subject.toUpperCase()}</span>
                    <div className={showSubjects === true ? "subjectsList" : "subjectsList hidden"}>
                      {subjects.map((subject, index) => 
                        <ul key={index}>
                          <li><strong>{subject.category}</strong></li>
                          {subject.subjects.map((subjectName, index) =>
                            <li key={index} onClick={() => {
                              setShowSubjects(!showSubjects)
                              setFieldValue('subject', subjectName )
                            }}>{subjectName}</li>
                          )}
                        </ul>
                      )}
                    </div>
                  </label>
                  <ErrorMessage name="subject" component={'span'} className="checkout-input-errmssg" />
                </div>
              <div>
                <div className="input-wrapper">
                  <label htmlFor="name" className="checkout-label" >
                    <Field  type='text' autoComplete="off" name="name" placeholder=" " className={errors.name ? "checkout-input checkout-input--error" : "checkout-input"}/>
                    <span className="checkout-labelcontent">Nombre</span>
                  </label>
                  <ErrorMessage name="name" component={'span'} className="checkout-input-errmssg" />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="mail" className="checkout-label" >
                    <Field  type='text' autoComplete="off" name="mail" placeholder=" " className={errors.mail ? "checkout-input checkout-input--error" : "checkout-input"}/>
                    <span className="checkout-labelcontent">Email</span>
                  </label>
                  <ErrorMessage name="mail" component={'span'} className="checkout-input-errmssg" />
                </div>
              </div>
              <div className="input-wrapper">
                <label htmlFor="orderNumber" className="checkout-label" >
                  <Field  type='text' autoComplete="off" name="orderNumber" placeholder=" " className={errors.orderNumber ? "checkout-input checkout-input--error" : "checkout-input"}/>
                  <span className="checkout-labelcontent">Número de pedido</span>
                </label>
                <ErrorMessage name="orderNumber" component={'span'} className="checkout-input-errmssg" />
                <span className="note-span">*Opcional:  Escribe el número de pedido si fuese necesario para resolver tu duda.</span>
              </div>
              <div className="input-wrapper">
                <label htmlFor="message" className="checkout-label" >
                  <Field as="textarea"  className="checkout-input checkout-input--textarea" autoComplete="off" name="message" placeholder=" "/>
                  <span className="checkout-labelcontent">Por favor, escribe aquí la duda que tengas</span>
                </label>
                <ErrorMessage name='message' component={'span'} className="checkout-input-errmssg" />
              </div>
              <button className="cta cta--maincolor" type='submit' disabled={isSubmitting}>Enviar tu pregunta</button>
              <PopUpAlert/>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

ContactPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}