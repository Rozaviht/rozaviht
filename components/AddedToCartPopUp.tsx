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
    <div ref={popUpRef} className={showAddedPopUp === true ? "popup-wrapper" : "popup-wrapper hidden"}>
      <div className="popup-img">
        <Image src={aceite10} height={100} width={100} layout="responsive" />
      </div>
      <p className="popup-text">{`¡Genial!, se ha añadido ${productAdded.name} a tu cesta de la compra.`}</p>
      <button className="close-bt close-bt--topright" onClick={() => setShowAddedPopUp(false)}>
          <div className="line-left"></div>
          <div className="line-right"></div>
        </button>
    </div>
  )
}

