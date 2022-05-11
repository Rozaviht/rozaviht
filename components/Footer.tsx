import { useState } from 'react'
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage, validateYupSchema, yupToFormErrors } from 'formik'
import { userValidation } from '../middleware/validations'

import Logo from '@img/logo.svg'
import InstagramIcon from '@img/instagram-icon.svg'
import FacebookIcon from '@img/facebook-icon.svg'
import SubcriptionAlert from './SubcriptionAlert'
import { gql, useMutation } from '@apollo/client'


const CREATE_USER = gql`
  mutation Mutation($email: String!) {
    createUser(email: $email) {
      message
      error
    }
  }
`

const Footer = () => {
  const [ createUser, {data, loading, error} ] = useMutation(CREATE_USER)

  const [footerListDropped, setFooterListDropped] = useState(false)
  const [showSubAlert, setShowSubAlert] = useState(false)

  const dropFooterList = () => setFooterListDropped(!footerListDropped)

  return (
      <div className="footer">
        <div className="footer__sub">
          <div className="footer__sub-text">
            <h2>¡Únete a la comunidad!</h2>
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
            onSubmit={(values, { setSubmitting }) => {
              console.log(values)
              setTimeout(() => {
                createUser({variables:  values})
                  .then(({data}) => {
                    console.log(data)
                  })
                  .catch(err => {
                    console.log(err)
                  })
                setSubmitting(false)
              }, 200)
            }}
          >
            {({
              isSubmitting
            }) => (
              <Form className="footer__sub-input">
                  <Field name='email' type="email" placeholder="Introduce aquí tu correo electrónico" className="input--negative"/>
                  < ErrorMessage name='email' component={'span'} />
                  <button className="cta cta--maincolor" type='submit' disabled={isSubmitting}>UNIRSE</button>
              </Form>
            )}
          </Formik>
          <SubcriptionAlert showSubAlert={showSubAlert} setShowSubAlert={setShowSubAlert} /> 
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
                    <Link href ="/"><a>- Política de cookies</a></Link>
                  </li>
                  <li>
                    <Link href ="/"><a>- Configuración de cookies</a></Link>
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
          <p style={{fontSize: "0.6rem"}}>Reservados todos los derechos @ 2022 Rozaviht</p>
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