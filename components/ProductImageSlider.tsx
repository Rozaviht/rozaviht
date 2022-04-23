
import Image from 'next/image'
import { useState } from "react"
import Dots from '@components/SliderDots'

type ProductImageSliderProps = {
  productImageData: string[]
}

const ProductImageSlider = ({productImageData}: ProductImageSliderProps) => {
  const [currentImage, setCurrentImage] = useState(0)

  const nextSlide = () => {
    setCurrentImage(currentImage === productImageData.length - 1 ? 0 : currentImage + 1)
  }
  
  const prevSlide = () => {
    setCurrentImage(currentImage === 0 ? productImageData.length - 1 : currentImage - 1)
  }

  if (!Array.isArray(productImageData) || productImageData.length <= 0) {
    return null
  }

  console.log(currentImage)

  return (
    <div className="slider-container">
      <button className={currentImage === 0 ? "btArrow btArrow--left hidden" : "btArrow btArrow--left"} onClick={prevSlide}></button>
      {productImageData.map((imageUrl, index) => {
        return (
          <div className={index === currentImage ? "slide-container active" : "slide-container"} key={index}>
            {index === currentImage && (
              <Image src={imageUrl} layout="responsive" objectFit="scale-down"/>
            )}
          </div>
        )
      })}
      <button className={currentImage === productImageData.length - 1 ? "btArrow btArrow--right hidden" : "btArrow btArrow--right"} onClick={nextSlide}></button>
      <Dots arrayParent={productImageData} activeIndex={currentImage}/>
    </div>
  )
}

export default ProductImageSlider