import Image from 'next/image'


import { CartItemType } from '../services/AppProvider'
import { Dispatch, SetStateAction, useRef, useEffect } from 'react'


export type AddedToCartPopUpProps = {
  productAdded: CartItemType,
  showAddedPopUp: boolean,
  setShowAddedPopUp: Dispatch<SetStateAction<boolean>>
}

export default function AddedToCartPopUp ({ productAdded, showAddedPopUp, setShowAddedPopUp}: AddedToCartPopUpProps) {
  const popUpRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      const handleClickOutside = (event: any) => {
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
    <div ref={popUpRef} className={showAddedPopUp === true ? 'popUp' : 'popUp popUp--hidden'}>
      <div className="popUp__img">
        <Image src={productAdded.image.url} height={productAdded.image.height!} width={productAdded.image.width!} alt="" layout="responsive" />
      </div>
      <p>{`¡Genial!, se ${productAdded.amount > 1 ? "han" : "ha"} añadido ${productAdded.amount} ${productAdded.name} a tu cesta de la compra.`}</p>
      <button className="closeBtSlide closeBtSlide--leftUp" onClick={() => setShowAddedPopUp(!showAddedPopUp)}>
          <div className="closeBtSlide__lineT"></div>
          <div className="closeBtSlide__lineC"></div>
          <div className="closeBtSlide__lineB"></div>
      </button>
    </div>
  )
}

