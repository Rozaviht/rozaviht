import { useState, useContext } from "react"
import Link from "next/link"

import { AppContext } from "services/AppContext"

export default function CookiesConsent () {
  const [cookiesAccepted, setCookiesAccepted] = useState(false)

  const {setCookiesManageShow} = useContext(AppContext)

  const handleCookiesAccepted = () => {
    setCookiesAccepted(true)
  }

  return (
    <div className={cookiesAccepted === false ? "cookies-consent-wrapper" : "cookies-consent-wrapper hidden"}>
      <h3>Nos importa tu privacidad</h3>
      <p>Nosotros utilizamos cookies y herramientas similares, para mejorar tu experiencia de compra y navegación por nuestra web.</p>
      <p>Haz click en <strong>Aceptar cookies</strong> para dar tu consentimiento o dirigete a <strong>Gestionar cookies</strong> para seleccionar las opciones que desees. Para obtener más información, consulta nuestra
      <Link href="/privacidad-seguridad">
        <a  style={{ 'textDecoration': 'underline' }}>
        Política de Privacidad
        </a>
      </Link>
      </p>
      <div className="cookies-consent-bts">
        <button className="bt-scndry bt-scndry--small" onClick={() => setCookiesManageShow(true)}>Gestionar cookies</button>
        <button className="bt-primary bt-primary--small" onClick={handleCookiesAccepted}>Aceptar cookies</button>
      </div>
    </div>
  )
}