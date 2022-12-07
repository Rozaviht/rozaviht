import Image from 'next/image'
import { useState } from "react"
import Dots from '@components/SliderDots'

import { cbdImages } from '../data/cbdImagesSlider'

import type { imageType } from 'services/AppProvider'

const ProductImageSlider = () => {


  const [currentImage, setCurrentImage] = useState(0)

  const nextSlide = () => {
    setCurrentImage(currentImage === cbdImages.length - 1 ? 0 : currentImage + 1)
  }
  
  const prevSlide = () => {
    setCurrentImage(currentImage === 0 ? cbdImages.length - 1 : currentImage - 1)
  }

  if (!Array.isArray(cbdImages) || cbdImages.length <= 0) {
    return null
  }

  return (
    <div className="slider-container">
      <button className={currentImage === 0 ? "btArrow btArrow--left hidden" : "btArrow btArrow--left"} onClick={prevSlide}></button>
      {cbdImages.map((image, index) => {
        return (
          <div className={index === currentImage ? "slide-container active" : "slide-container"} key={index}>
            {index === currentImage && (
              <div className={ index === 0 || index == 1 ?  'slide slide--half' : 'slide'}>
                <Image src={image.url} height={image.height!} width={image.width!} alt={image.alt}  layout="responsive" objectFit='contain' />
              </div>
            )}
          </div>
        )
      })}
      <button className={currentImage === cbdImages.length - 1 ? "btArrow btArrow--right hidden" : "btArrow btArrow--right"} onClick={nextSlide}></button>
      <Dots arrayParent={cbdImages} activeIndex={currentImage}/>
    </div>
  )
}

export default ProductImageSlider