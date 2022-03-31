import Link from "next/link"
import { useContext } from "react"

import { AppContext } from "services/AppContext"

export default function CookiesManage () {

  const {cookiesManageShow, setCookiesManageShow} = useContext(AppContext)

  return (
    <div className={cookiesManageShow === true ? "cookies-manage" : "cookies-manage hidden"}>
      <div className="cookies-manage-nav">
        <h2>Gestionar cookies</h2>
        <button className="close-bt--cart" onClick={() => setCookiesManageShow(false)}>
          <div className="line-left"></div>
          <div className="line-right"></div>
        </button>
      </div>
      <div className="cookies-manage-main">
        <h3>Listado e información de las cookies</h3>
        <p>Explora cada categoría para obtener más información y modificar la configuración. Desactivar la recopilación de datos puede afectar a tu experiencia y a los servicios que podemos ofrecerte. Si necesitas más información y quieres ver más opciones, consulta la 
          <Link href="/">
            <a>Política de privacidad</a>
          </Link>
        </p>
        <div className="cookies-container">
          <div className="cookies-container-top">
            <h4>Cookies estrictamente necesarias</h4>
            <p>Activas siempre</p>
          </div>
          <p>Estas cookies son necesarias para habilitar las características y las funcionalidades básicas. No se pueden desactivar en nuestros sistemas. Puedes configurar tu navegador para que las bloquee o te avise de su presencia pero, en caso de hacerlo, habrá partes del sitio que no funcionarán. Esta configuración del navegador no afectará a la totalidad de tu cuenta.</p>
        </div>
        <div className="cookies-container">
          <div className="cookies-container-top">
            <h4>Cookies de rendimiento</h4>
            <label htmlFor="cookies-checkbox-1" className="switch">
              <input type="checkbox" id="cookies-checkbox-1" />
              <div className="cookies-slider round"></div>
            </label>
          </div>
          <p>Estas cookies nos permiten medir y analizar el uso, evaluar el rendimiento, comprender las interacciones de los usuarios y mejorar nuestros productos y servicios.</p>
        </div>
        <div className="cookies-container">
          <div className="cookies-container-top">
            <h4>Cookies funcionales</h4>
            <label htmlFor="cookies-checkbox-2" className="switch">
              <input type="checkbox" id="cookies-checkbox-2" />
              <div className="cookies-slider round"></div>
            </label>
          </div>
          <p>Estas cookies permiten que el servicio ofrezca una mayor funcionalidad y personalización. Además, nos ayudan a mejorar y medir los anuncios contextuales (no personalizados) y limitar la frecuencia con la que los ves.</p>
        </div>
        <div className="cookies-container">
          <div className="cookies-container-top">
            <h4>Cookies publicitarias</h4>
            <label htmlFor="cookies-checkbox-3" className="switch">
              <input type="checkbox" id="cookies-checkbox-3" />
              <div className="cookies-slider round"></div>
            </label>
          </div>
          <p>Nosotros o nuestras redes sociales y socios de publicidad podemos utilizar estas cookies para mostrarte anuncios publicitarios que sean de tu interés. Si no las autorizas, continuarás recibiendo anuncios, pero no serán personalizados.</p>
        </div>
        <button className="bt-primary bt-primary--small">Guardar preferencias</button>
      </div>
    </div>
  )
}