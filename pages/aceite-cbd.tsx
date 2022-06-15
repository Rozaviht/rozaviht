import prisma from '../lib/prisma'
import Image from 'next/image'

import useCbdPage from "@hooks/useCbdPage"

import type { imageType } from "../services/AppProvider"
import type { ReactElement } from "react"

import Layout from "@components/Layout"
import ProductImageSlider from '@components/ProductImageSlider'
import AddedToCartPopUp from "@components/AddedToCartPopUp"
import RecyclingAnimation from '@components/RecyclingAnimatino'

import LiquidSVGTop from '@img/liquid-svg-top.svg'
import LiquidBubbles from '@img/liquid-bubbles.svg'

export type CbdProductsData = {
  name: string
  description: string
  images: imageType[]
  products: {
    id: number
    name: string
    price: number
    image: imageType
  }[]
}

export interface CbdPageProps  {
  CbdProductsData : CbdProductsData
}

export default function CbdPage ({ CbdProductsData}: CbdPageProps) {

  const {decrementAmount, incrementAmount, changeOil, handleDropInfo, handleAddToCart, showAddedPopUp, setShowAddedPopUp, infoList, currentProduct, totalAmountPrice} = useCbdPage({CbdProductsData})

  return(
    <div className="cbdPage">
      <AddedToCartPopUp  productAdded={currentProduct} showAddedPopUp={showAddedPopUp} setShowAddedPopUp={setShowAddedPopUp}/>
      <div className="product-hero">
        <ProductImageSlider productImages={CbdProductsData.images} ></ProductImageSlider>
        <div className="flexcolum flexcolum--around">
          <h1 className="product-hero__title">Aceite de CBD</h1>
          <p>0% THC | 10ml</p>
          <p className="product-hero__desc">
            Siente relajación y bienestar al usar nuestro aceite de CBD con aceite de cáñamo. No contiene nada de THC, y es completamente natural y vegano.
          </p>
          <h2 className="product-hero__price">{`${totalAmountPrice},00€`}</h2>
          <p>(IVA incluido)</p>
          <div className="oil-percentage">
            <h3>Porcentaje:</h3>
            <div className="oil-percentage__list">
              <button 
              className={currentProduct.price === 45 ? "oil-percentage__item selected" : "oil-percentage__item"}
              onClick={() => changeOil(10)}
              >10%</button>
              <button 
              className={currentProduct.price === 65 ? "oil-percentage__item selected" : "oil-percentage__item"}
              onClick={() => changeOil(20)}
              >20%</button>
            </div>
          </div>
          <div className="flexrow">
            <div className="amount">
                <input className="amount__input" type="number" value={currentProduct.amount} disabled={true}/>
                <div className="amount__bts">
                  <button onClick={incrementAmount}>+</button>
                  <button onClick={decrementAmount}>-</button>
                </div>
            </div>
            <button className="product-hero__cta" onClick={() => handleAddToCart(currentProduct)}>
              <div className="product-hero__cta-plus">
                <div className="product-hero__cta-plus-line"></div>
                <div className="product-hero__cta-plus-line"></div>
              </div>
              Añadir a la cesta
            </button> 
          </div>
        </div>
      </div>
      <div className="product-frstSect">
        <LiquidSVGTop className="liquidTop" />
        <LiquidBubbles className="liquidBottom" />
        <div className="product-frstSect__text">
          <p>Este aceite te ayudara a relajar toda la tension que tengas acumulada, ayudandote también a manejar el estrés y la ansiedad, todo con tan solo un par de gotas...</p>
        </div>
        <div className='product-frstSect__img' >
          < Image src={CbdProductsData.images[4].url} height={CbdProductsData.images[4].height!} width={CbdProductsData.images[4].width!} alt={CbdProductsData.images[4].alt} layout='responsive' />
        </div>
      </div>
      {/* PRODUCT INFORMATION */}
      <div className="product-inf">
        <div className='product-inf__img'>
          < Image src={CbdProductsData.images[5].url} height={CbdProductsData.images[5].height!} width={CbdProductsData.images[5].width!} alt={CbdProductsData.images[5].alt} layout='responsive' />
        </div>
        <div className="product-inf__content">
          <h1 className="product-info__title">Información del Producto</h1> 
          <div className="information-content-wrapper">
            <h2 className={infoList[0] === true ? "information-content-title colored" : "information-content-title"} onClick={() => handleDropInfo(0)} >QUE HACE</h2>
            <div className={ infoList[0] === true ? "information-content dropped" : "information-content" }>
              <p>Nuestro aceite de CBD cuenta con varios beneficios, entre ellas propiedades antiinflamatorias, antidepresivas, y relajante muscular; los cuales con tan solo un par de gotas notarás sus efectos casí de inmediato. Debido a estos beneficios podrás notar mejoras en tus dolores musculares e irritaciones, a la misma vez sintiéndote relajado. También gracias a él podrás mejorar el estrés del día a día y conciliar de una mejor manera el sueño, si lo aplicas antes de dormir.</p>
            </div>
          </div>
          <div className="information-content-wrapper">
            <h2 className={infoList[1] === true ? "information-content-title colored" : "information-content-title"} onClick={() => handleDropInfo(1)}>COMO UTILIZARLO</h2>
            <div className={ infoList[1] === true ? "information-content dropped" : "information-content" }>
            <p>El aceite de CBD se emplea generalmente de dos formas: de manera tópica o de manera sublingual. La legislación española actual solo permite la venta de aceite de CBD de manera tópica, que es la manera en la que esta destinada nuestro producto. Solo informamos del otro método de empleo ya que muchas personas lo utilizan de esa mánera.</p>
            <ul style={{ 'marginTop': '0.5rem' }}>
              <li style={{ 'marginTop': '0.5rem' }}>
                <strong>-Empleo de manera tópica:</strong>
                <p>Aplicar un par de gotas en la zona deseada y masajear la zona hasta que se haya absorbido completamente el aceite. De esta forma, se debería notar una relajación casi inmediata y una desinflamación en la zona aplicada.</p>
              </li>
              <li style={{ 'marginTop': '0.5rem' }}>
                <strong>-Empleo de manera sublingual:</strong>
                <p>Aplicar un par de gotas en la zona debajo de la lengua, y esperar por lo menos 1 minuto, para que se absorba completamente el aceite. Siempre se recomienda empezar con unas dos gotas de aceite e ir aumentando gradualmente la cantidad, si se cree necesario.</p>
              </li>
            </ul>
            </div>
          </div>
          <div className="information-content-wrapper">
            <h2 className={infoList[2] === true ? "information-content-title colored" : "information-content-title"} onClick={() => handleDropInfo(2)}>INGREDIENTES</h2>
            <div className={ infoList[2] === true ? "information-content dropped" : "information-content" }>
            <p>-Aceite de semilla de Cannabis Sativa ( Aceite de Cañamo )</p> 
            <p>-Cannabidiol ( CBD )</p> 
            <p>-Acetato de tocoferilo ( Vitamina E )</p> 
            </div>
          </div>
          <div className="information-content-wrapper">
            <h2 className={infoList[3] === true ? "information-content-title colored" : "information-content-title"} onClick={() => handleDropInfo(3)}>COMO RECICLARLO</h2>
            <div className={ infoList[3] === true ? "information-content dropped" : "information-content" }>
              <p>- El packaging/estuche va en cartón.</p>
              <p>- En cuanto al envase del aceite, primero separa el tapón de la parte de vidrio del cuentagotas. Introduce el frasco en agua caliente para poder remover facilmente la etiqueta. Finalmente con las partes separdas, tira los objetos vidrio en su respectivo contenedor, y los de plastico en el suyo.</p>
              < RecyclingAnimation  infoList={infoList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export const getStaticProps = async () => {
  const CbdProductsData = await prisma.product_categories.findUnique({
    where: {
      name: "Aceite de CBD"
    },
    select: {
      name: true,
      description: true,
      images: true,
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          image: true
        }
      }
    }
  })
  return {
    props: { CbdProductsData }
  }
}


CbdPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}


