import Image from 'next/image'

import type { ReactElement } from "react"

import Layout from '@components/Layout'

import privacyBanner from '@img/privacy-banner4.webp'

export default function PrivacyPage () {
  return (
    <div className="legalPage">
      <div className="legalPage__banner">
        <h1 className="legalPage__title" >POLÍTICA DE PRIVACIDAD Y SEGURIDAD DE ROZAVIHT</h1>
        <Image src={privacyBanner} layout="responsive"/>
      </div>
      <div className='flexcolum flexcolum--separate'>
        <h2>NOSOTROS</h2>
        <p>
          La marca Rozaviht, sita en calle palestina 17 Alcobendas 28100 Madrid (España). Con número de teléfono de atención al cliente y correo electrónico  attcliente@rozaviht.com.
        </p>
        <p>
          Pueden verificar de una manera rápida y sencilla todos nuestros términos y condiciones al igual que nuestra política de privacidad, ingresando en todo momento desde nuestra página principal.
        </p>
        <p>
          En este apartado encontrarás toda la información relevante, que aplicaremos sobre el uso de tus datos, derechos y de cómo los gestionamos. Siendo en todo momento transparentes sobre el tratamiento de estos.
        </p>
        <h2>USO DE DATOS PORQUE Y PARA QUE</h2>
        <p>
          El uso de este sitio web, implica la aceptación de uso por parte de todos los usuarios.
          Esto no implica que facilite sus datos para navegar en nuestra web.Las  únicas maneras en las que solicitaremos los datos son:
        </p>
        <p>
          Al comprar un producto. <br />
          Al solicitar alguna consulta. <br />
          Al inscribirse en nuestro portal de noticias. <br />
        </p>
        <p>
          Todos los datos recogidos serán únicamente con el fin de proporcionar una mejor venta,y poderle proporcionar de una mejor manera los productos servicio o información que necesite. datos recogidos : nombre, género, edad , correo electrónico  y dirección postal, para realizar envíos de ventas realizadas por medio de nuestra web.
        </p>
        <h2>DERECHOS</h2>
        <p>
          Todo usuario que nos facilite datos tiene los siguientes derechos:
        </p>
        <p>
          Derecho al acceso: todo usuario tiene derecho a solicitar información, sobre sus datos de almacenamiento.
        </p>
        <p>
         Derecho a la rectificación : usted tiene derecho a que Rozaviht complete  o modifique cualquier dato personal ya sea por tenerlos de manera incompletas o inexactas. 
        </p>
        <p>
          Derecho a la presentación de reclamación: usted tiene derecho a presentar cualquier queja que tenga sobre el trato, o sobre el estado del producto comprado. presentando a través del siguiente formulario y enviándola al correo electrónico correspondiente.
        </p>
        <h2>LEGITIMACIÓN Y NORMATIVA PARA EL TRATAMIENTO DE LOS DATOS</h2>
        <p>
          Rozaviht garantiza el cumplimiento de la normativa vigente en materia de protección de datos personales, reflejada en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y de Garantía de Derechos Digitales (LOPD GDD). Cumple también con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 relativo a (RGPD). Todas las condiciones de uso están regidas por la Legislación Española.
        </p>
        <ul>
          <li>
            <p>
              El usuario será el único que puede autorizar y consentir el uso de sus datos.
            </p>
          </li>
          <li>
            <p>
              Los datos facilitados por el cliente serán usados de manera confidencial y únicamente para el trámite a realizar.
            </p>
          </li>
          <li>
            <p>
              Se garantiza el aviso del plazo, para la conservación de datos de los usuarios.
            </p>
          </li>
          <li>
            <p>
             Los datos únicamente se solicitan y utilizaran a la hora de gestionar alguna compra en nuestra página web.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

PrivacyPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}