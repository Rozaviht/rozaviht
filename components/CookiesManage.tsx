import Link from "next/link"
import { useContext } from "react"

import { AppContext } from "services/AppContext"

export default function CookiesManage () {

  const {cookiesManageShow, setCookiesManageShow} = useContext(AppContext)

  return (
    <div className={cookiesManageShow === true ? "cookies-manage" : "cookies-manage hidden"}>
      <div className="cookies-manage-nav">
        <h2>Gestionar cookies</h2>
      </div>
      <div className="cookies-manage-main">
        <h3>Listado e información de las cookies</h3>
        <p>Estan son las cookies que utilizamos es nuestro servicio web, puedes leerlas detenidamente y configurarlas como deseas. Desactivar la recopilación de datos puede afectar a tu experiencia y a los servicios que podemos ofrecerte. Si necesitas más información, consulta la 
          <Link href="/politica-seguridad">
            <a style={{ 'textDecoration': 'underline' }}>Política de cookies.</a>
          </Link>
        </p>
        <div className="cookies-container">
          <div className="cookies-container-top">
            <h4>Cookies estrictamente necesarias</h4>
            <p>Activas siempre</p>
          </div>
          <p>Estas cookies son necesarias para habilitar las características y las funcionalidades básicas. No se pueden desactivar en nuestro servicio web. Puedes configurar tu navegador para que las bloqueé o te avise de su presencia pero, en caso de hacerlo, habrá partes del sitio o en sitio en si mísmo, que no funcionarán.</p>
        </div>
        <div className="cookies-container">
          <div className="cookies-container-top">
            <h4>Cookies de análisis de rendimiento</h4>
            <label htmlFor="cookies-checkbox-1" className="switch">
              <input type="checkbox" id="cookies-checkbox-1" />
              <div className="cookies-slider round"></div>
            </label>
          </div>
          <p>Estas cookies nos permiten medir y analizar el uso, evaluar el rendimiento, y comprender las interacciones de los usuarios. Para poder mejorar nuestro servicio web y conseguir una mejor experiencia para los usuarios.</p>
        </div>
        <button className="bt-primary bt-primary--small" onClick={() => setCookiesManageShow(false)} >Guardar preferencias</button>
      </div>
    </div>
  )
}