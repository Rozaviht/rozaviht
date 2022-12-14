import Image from "next/image"
import { useContext, useEffect } from "react"
import { AppContext } from "services/AppContext"

export default function PopUpAlert() {

  const { popUpOpen, setPopUpOpen, popUpMssg, popUpImg }= useContext(AppContext)

  useEffect(() => {
    if (popUpOpen === true) {
      const popUpInterval = setTimeout(() => {
        setPopUpOpen(false)
      }, 5100)
      return () => clearInterval(popUpInterval)
    }
  }, [popUpOpen])


  if (!popUpOpen) return null

  return (
    <div className={popUpOpen === true ? "popUp aniOn" : "popUp"}>
      <div className="flexrow flexrow--separate flexrow--algncenter">
        <div className="popUp-img">
          <Image src={popUpImg.url} alt={popUpImg.alt} height={popUpImg.height!} width={popUpImg.width!} layout="responsive" />
        </div>
        <div>
          <p>{popUpMssg[0]}</p>
          <p>{popUpMssg[1]}</p>
        </div>
      </div>
      <div className={popUpOpen === true ? "popup-bartime-1 aniOn" : "popup-bartime-1"}></div>
      <div className="popup-bartime-2"></div>
    </div>
  )
}