import { useContext, useEffect } from "react"
import { AppContext } from "services/AppContext"


export default function PopUpAlerts () {

  const { showPopUp, setShowPopUp, popUpMssg } = useContext(AppContext)



  return (
    <div className={showPopUp === true ? "subAlert aniOn" : "subAlert"}>
      <h2>{popUpMssg[0]}</h2>
      <p>{popUpMssg[1]}</p>
      <div className={showPopUp === true ? "popup-bartime-1 aniOn" : "popup-bartime-1"}></div>
      <div className="popup-bartime-2"></div>
    </div>
  )
}