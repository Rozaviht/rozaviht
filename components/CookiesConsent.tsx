import { useState, useContext, useEffect } from "react"
import Link from "next/link"

import { AppContext } from "services/AppContext"

export default function CookiesConsent () {

  const {setCookiesManageShow} = useContext(AppContext)

  const [cookiesAccepted, setCookiesAccepted] = useState<string | null>("")

  var cookiesPref: string | null = "" 


  useEffect(() => {
    if(window) {
      cookiesPref = localStorage.getItem("cookiesAccepted")
      setCookiesAccepted(cookiesPref)
    }
  })

  useEffect(() => {
    localStorage.setItem("cookiesAccepted", "true")
  }, [cookiesAccepted])

  console.log(cookiesPref)

  return (
    <div className={cookiesAccepted === "true" ? "cookies-consent hidden" : "cookies-consent"}>
      <div className="cookies-consent__txt">
        <h3>Nos importa tu privacidad</h3>
        <p>Nosotros utilizamos cookies y herramientas similares, para mejorar tu experiencia de compra y navegación por nuestra web.</p>
        <p>Haz click en <strong>Aceptar cookies</strong> para dar tu consentimiento o dirigete a <strong>Gestionar cookies</strong> para seleccionar las opciones que desees. Para obtener más información, consulta nuestra
        <Link href="/privacidad-seguridad">
          <a>
          Política de Privacidad
          </a>
        </Link>
        </p>
      </div>
      <div className="cookies-consent__bts">
        <button className="bt-scndry bt-scndry--small" onClick={() => setCookiesManageShow(true)}>Gestionar cookies</button>
        <button className="bt-primary bt-primary--small" onClick={() => setCookiesAccepted("true")}>Aceptar cookies</button>
      </div>
    </div>
  )
}