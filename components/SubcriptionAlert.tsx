import type { Dispatch, SetStateAction } from "react"

import Logo from '@img/logo.svg'

interface SubcriptionAlertProps {
  showSubAlert: boolean
  setShowSubAlert: Dispatch<SetStateAction<boolean>>
}

export default function SubcriptionAlert ({showSubAlert, setShowSubAlert}: SubcriptionAlertProps) {
  return (
    <div className={showSubAlert === true ? "subAlert" : "subAlert hidden"}>
      <button className="closeBt closeBt--topRight" onClick={() => setShowSubAlert(false)}>
        <div className="closeBt__lineL"></div>
        <div className="closeBt__lineR"></div>
      </button>
      <h3>Muchas gracias por subscribirte!!!</h3>
      <p>En algún momento de hoy, recibirás un correo electrónico confirmando la subcripción.</p>
      <p>Que tengas un buen día, saludos desde</p>
      <div className="subAlert__logo">< Logo /></div>
    </div>
  )
}