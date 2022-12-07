import { useContext, useState } from 'react'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client'
import { Formik, Form, Field, ErrorMessage, validateYupSchema, yupToFormErrors } from 'formik'
import { userValidation } from '../middleware/validations'

import PopUpAlert from './PopUpAlerts'
import LoadingDots from './LoadingDots'

import Logo from 'public/img/logo.svg'
import InstagramIcon from 'public/img/instagram-icon.svg'
import FacebookIcon from 'public/img/facebook-icon.svg'
import { AppContext } from 'services/AppContext'


const CREATE_USER = gql`
  mutation Mutation($email: String!) {
    createUser(email: $email) {
      message
      error
    }
  }
`

const Footer = () => {
  const [ createUser ] = useMutation(CREATE_USER)

  const { setCookiesManageShow, setShowPopUp, setPopUpMssg} = useContext(AppContext)

  const [footerListDropped, setFooterListDropped] = useState(false)
  const [loadingDots, setLoadingDots] = useState(false)


  const dropFooterList = () => setFooterListDropped(!footerListDropped)

  return (
      <div className="footer">
        <div className="footer__sub">
          <div className="footer__sub-text">
            <h2>¡Únete a Rozaviht!</h2>
            <p>
              Mantente enterado de nuestras novedades, y tranquilo solo te escribiremos cuando publiquemos 
              nuevos artículos o saquemos un nuevo producto.
            </p>
            <strong>
              No haremos spam, no es ecológico.
            </strong>
            <p>
              Tus datos personales se usarán tal y como se describe en nuestra
              <Link href="/privacidad-seguridad">
                <a style={{textDecoration: "underline", marginLeft: "5px"}}>
                  Política de Privacidad
                </a>
              </Link>
            </p>
          </div>
          <Formik
            initialValues={{ email: ''}}
            validate={values => {
              try {
                validateYupSchema(values, userValidation, true, values)
              } catch (err) {
                return yupToFormErrors(err)
              }
              return {}
            }}
            validationSchema={userValidation}
            onSubmit={(values, { setSubmitting, setFieldValue }) => {
                setLoadingDots(true)
                createUser({variables:  values})
                  .then(({data}) => {
                    if (data.createUser.error === true) {
                      setPopUpMssg(data.createUser.message)
                      setShowPopUp(true)
                      setLoadingDots(false)
                    } else {
                      setPopUpMssg(data.createUser.message)
                      setShowPopUp(true)
                      setLoadingDots(false)
                    }
                  })
                  .catch(err => {
                    console.log(err)
                    setLoadingDots(false)
                  })
                setFieldValue("email", "")
                setSubmitting(false)

            }}
          >
            {({
              errors,
              isSubmitting
            }) => (
              <Form className="footer__sub-input">
                  <label htmlFor='email' className="customInput customInput--bgcolor" >
                    <Field id="subEmail" type='email' autoComplete="off" name='email' placeholder=" " className={errors.email ? "customInput__input customInput__input--error" : "customInput__input"}/>
                    <span className="customInput__label">Introduce aquí tu correo</span>
                  </label>
                  <ErrorMessage name='email' className="customInput__errmssg" component={'span'} />
                  <button className="cta cta--negative" type='submit' disabled={isSubmitting}>
                    UNIRSE
                    <LoadingDots show={isSubmitting} type1={false} />
                  </button>
              </Form>
            )}
          </Formik>
          <PopUpAlert /> 
        </div>
        <div className="footer__downSide">
          <div className="dropMenu">
              <h4  className={footerListDropped ? "dropMenu__title dropped" : "dropMenu__title"} onClick={dropFooterList}> Atención al cliente</h4>
              <div className={footerListDropped ? "dropMenu__content dropped" : "dropMenu__content"}>
                <ul className="flexcolum flexcolum--separate">
                  <li>
                    <Link href ="/preguntas-frecuentes/devolucion"><a>- Cambios y devoluciones</a></Link>
                  </li>
                  <li>
                    <Link href ="/preguntas-frecuentes"><a>- Preguntas frecuentes ( FAQ )</a></Link>
                  </li>
                  <li>
                    <Link href ="/contacto"><a>- Contacto</a></Link>
                  </li>
                  <li>
                    <Link href ="/politica-cookies"><a>- Política de cookies</a></Link>
                  </li>
                  <li>
                    <span onClick={() => setCookiesManageShow(true)} style={{'cursor': 'pointer'}}>- Configuración de cookies</span>
                  </li>
                </ul>
            </div>
          </div>
          <div className="footer__mediaIcons-container">
            <div className="flexrow">
              <Link href="https://www.facebook.com/rozaviht">
                <a className="footer__mediaIcon">
                  <FacebookIcon alt="Icono de facebook de enlace para la pagina de Rozaviht facebook" />
                </a>
              </Link>
              <Link href="https://www.instagram.com/rozaviht">
                <a className="footer__mediaIcon">
                  <InstagramIcon alt="Icono de facebook de enlace para la pagina de Rozaviht instagram" />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flexcolum flexcolum--around">
          <div className="footer__logoImg">
            <Logo alt="logo de Rozaviht" />
          </div>
          <p style={{fontSize: "0.6rem"}}>Reservados todos los derechos © 2022 Rozaviht</p>
          <div className="flexrow">
            <Link href="/privacidad-seguridad" >
              <a style={{borderRight: "1px solid #9b532b", paddingRight: "0.5rem", fontSize: "0.6rem"}}>
                Seguridad y Privacidad
              </a>
            </Link>
            <Link href="/terminos-condiciones">
              <a style={{paddingLeft: "0.5rem", fontSize: "0.6rem"}}>
                Términos y Condiciones
              </a>
            </Link>
          </div>
        </div>
      </div>
  )
}
  
export default Footer