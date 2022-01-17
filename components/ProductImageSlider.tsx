import { ProductImageData } from "./ProductImageData"
import Image from 'next/image'
import { useState } from "react"
import Dots from '@components/SliderDots'


const ProductImageSlider = () => {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent(current === ProductImageData.length - 1 ? 0 : current + 1)
  }
  
  const prevSlide = () => {
    setCurrent(current === 0 ? ProductImageData.length - 1 : current - 1)
  }

  if (!Array.isArray(ProductImageData) || ProductImageData.length <= 0) {
    return null
  }

  return (
    <div className="slider-container">
      <button className="btArrow left" onClick={prevSlide}></button>
      {ProductImageData.map((slide, index) => {
        return (
          <div className={index === current ? "slide-container active" : "slide-container"} key={index}>
            {index === current && (
              <Image src={slide.image.src} width={slide.image.width} height={slide.image.height} layout="responsive" objectFit="scale-down"/>
            )}
          <Dots arrayParent={ProductImageData} activeIndex={index}/>
          </div>
        )
      })}
      <button className="btArrow right" onClick={nextSlide}></button>
    </div>
  )
}

export default ProductImageSlider