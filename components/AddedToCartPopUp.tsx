import Image from 'next/image'

import type { productAddedType} from 'pages/aceite-cbd'
import { Dispatch, SetStateAction, useRef, useEffect } from 'react'

import aceite10 from '@img/aceite10-concaja.png'


export type AddedToCartPopUpProps = {
  productAdded: productAddedType,
  showAddedPopUp: boolean,
  setShowAddedPopUp: Dispatch<SetStateAction<boolean>>
}


export default function AddedToCartPopUp ({productAdded, showAddedPopUp, setShowAddedPopUp}: AddedToCartPopUpProps) {
  const popUpRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (popUpRef.current && !popUpRef.current.contains(event.target)) {
          setShowAddedPopUp(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [popUpRef])

  return (
    <div ref={popUpRef} className={showAddedPopUp === true ? "popUp" : "popUp popUp--hidden"}>
      <div className="popUp__img">
        <Image src={aceite10} height={100} width={100} layout="responsive" />
      </div>
      <p>{`¡Genial!, se ha añadido ${productAdded.name} a tu cesta de la compra.`}</p>
      <button className="closeBt closeBt--topRight" onClick={() => setShowAddedPopUp(false)}>
          <div className="closeBt__lineL"></div>
          <div className="closeBt__lineR"></div>
        </button>
    </div>
  )
}
