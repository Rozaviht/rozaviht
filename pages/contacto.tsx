import Layout from "@components/Layout"
import { ErrorMessage, Field, Form, Formik, validateYupSchema, yupToFormErrors, useFormikContext } from "formik"
import { contactMessageRules } from "middleware/validations/contactMessage"
import { ReactElement, useState } from "react"

import { subjects } from "data/contactFormSubjects"

export default function ContactPage () {

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
            email: '',
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
                  <label htmlFor="email" className="checkout-label" >
                    <Field  type='text' autoComplete="off" name="email" placeholder=" " className={errors.email ? "checkout-input checkout-input--error" : "checkout-input"}/>
                    <span className="checkout-labelcontent">Email</span>
                  </label>
                  <ErrorMessage name="email" component={'span'} className="checkout-input-errmssg" />
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