import { ProductImageData } from "./ProductImageData"
import Image from 'next/image'
import { useState } from "react"
import Dots from '@components/SliderDots'


const ProductImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0)

  const nextSlide = () => {
    setCurrentImage(currentImage === ProductImageData.length - 1 ? 0 : currentImage + 1)
  }
  
  const prevSlide = () => {
    setCurrentImage(currentImage === 0 ? ProductImageData.length - 1 : currentImage - 1)
  }

  if (!Array.isArray(ProductImageData) || ProductImageData.length <= 0) {
    return null
  }

  console.log(currentImage)

  return (
    <div className="slider-container">
      <button className={currentImage === 0 ? "btArrow btArrow--left hidden" : "btArrow btArrow--left"} onClick={prevSlide}></button>
      {ProductImageData.map((slide, index) => {
        return (
          <div className={index === currentImage ? "slide-container active" : "slide-container"} key={index}>
            {index === currentImage && (
              <Image src={slide.image.src} width={slide.image.width} height={slide.image.height} layout="responsive" objectFit="scale-down"/>
            )}
          </div>
        )
      })}
      <button className={currentImage === ProductImageData.length - 1 ? "btArrow btArrow--right hidden" : "btArrow btArrow--right"} onClick={nextSlide}></button>
      <Dots arrayParent={ProductImageData} activeIndex={currentImage}/>
    </div>
  )
}

export default ProductImageSlider