import { useState, useContext } from "react"
import prisma from '../lib/prisma'

import { CartItemType } from "../services/AppProvider"
import { AppContext } from 'services/AppContext'

import type { ReactElement } from "react"

import ProductImageSlider from '@components/ProductImageSlider'
import Layout from "@components/Layout"
import AddedToCartPopUp from "@components/AddedToCartPopUp"

interface props  {
  productData : [{
    id: number,
    name: string,
    price: number,
    image: string
  }],
  productCategorieData : {
    name: string
    description: string
    images: string[]
  }
}

export type cleanedProductData = [{
  id: number
  name: string
  price: number
  image: string
}]

export type productAddedType = {
  name: string
}


export const getStaticProps = async () => {
  const productData = await prisma.products.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      image: true
    }
  })

  const productCategorieData = await prisma.product_categories.findUnique({
    where: {
      name: "Aceite de CBD"
    },
    select: {
      name: true,
      description: true,
      images: true
    }
  })
  return {
    props: { productData, productCategorieData }
  }
}






export default function cbdPage ({ productData, productCategorieData}: props) {
  console.log(productData)
  const { setCartProducts } = useContext( AppContext )

  const [amountSelected, setAmountSelected] = useState(1)
  const [currentPrice, setCurrentPrice] = useState(productData[0].price)
  const [selected, setSelected] = useState(productData[0].id)
  const [currentName, setCurrentName] = useState(productData[0].name)
  const [infoList, setInfoList] = useState([false, false, false, false])
  const [productAdded, setProductAdded] = useState<CartItemType>({} as CartItemType)
  const [showAddedPopUp, setShowAddedPopUp] = useState(false)
  
  var currentProduct = {
    id : selected,
    price: currentPrice,
    name: currentName,
    amount: amountSelected,
    image: productData[0].image
  }
  var totalAmountPrice: number = amountSelected * currentPrice



  function decrementAmount () {
    if (amountSelected > 1){
      setAmountSelected(prevAmountSelected => prevAmountSelected - 1)
    }
  }
  function incrementAmount () {
    setAmountSelected(prevAmountSelected => prevAmountSelected + 1)
  }

  const changeOil = (oilType: number) => {
      if (oilType === 1) {
        setCurrentPrice(productData[0].price)
        setSelected(productData[0].id)
        setCurrentName(productData[0].name)
        
      }
      else {
        setCurrentPrice(productData[1].price)
        setSelected(productData[1].id)
        setCurrentName(productData[1].name)
      }
      setAmountSelected(1)
  }


  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartProducts(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + amountSelected }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: amountSelected }];
    });

    setProductAdded(clickedItem)
    
    setShowAddedPopUp(true)
  };

  const handleDropInfo = (index:number) => {
    let infoCopy = [...infoList]
    infoCopy[index] = !infoList[index]
    setInfoList(infoCopy)
  }

  return(
    <div className="product-page">
      <AddedToCartPopUp  productAdded={productAdded} showAddedPopUp={showAddedPopUp} setShowAddedPopUp={setShowAddedPopUp}/>
      <div className="product-hero">
        <ProductImageSlider productImageData={productCategorieData.images} ></ProductImageSlider>
        <div className="container--flexcolumn product-actions">
          <h1 className="product-title">Aceite de CBD</h1>
          <p>0% THC | 10ml</p>
          <p className="p--textCenter mrgtop">
            Siente relajación y bienestar al usar nuestro aceite de CBD con aceite de cañamo. No contiene nada de THC, y es completamente natural y vegano.
          </p>
          <h2 className="product-price mrgtop">{`${totalAmountPrice},00€`}</h2>
          <p>(IVA incluido)</p>
          <div className="oil-percentage">
            <h3>Porcentaje:</h3>
            <div className="oil-percentage-list">
              <button 
              className={selected === 1 ? "oil-percentage-list-item selected" : "oil-percentage-list-item"}
              onClick={() => changeOil(1)}
              >10%</button>
              <button 
              className={selected === 2 ? "oil-percentage-list-item selected" : "oil-percentage-list-item"}
              onClick={() => changeOil(2)}
              >20%</button>
            </div>
          </div>
          <div className="container--flexrow">
            <div className="amount">
                <button className="amount-bt bt--plus" onClick={incrementAmount}>+</button>
                <input className="amount-input" type="number" value={amountSelected} disabled="disabled"/>
                <button className="amount-bt bt--minus" onClick={decrementAmount}>-</button>
            </div>
            <button className="product-hero-cta" onClick={() => handleAddToCart(currentProduct)}>
              <div className="cta-plus">
                <div className="cta-plus-line"></div>
                <div className="cta-plus-line"></div>
              </div>
              <h4 className="product-hero-cta-text">
                Añadir a la cesta
              </h4>
            </button> 
          </div>
        </div>
      </div>
      <div className="product-first-section">
        <div className="animated-text-container">
          <p className="product-animated-text">Este aceite te ayudara a realajar toda la tension que tengas acumulada, te ayudara a conciliar de mejor manera el sueño, ayudandote también a manejar el estrés y la ansiedad, todo con tan solo un par de gotas...</p>
        </div>
      </div>
      {/* PRODUCT INFORMATION */}
      <div className="product-information">
        <div className="text-container">
          <h1 className="product-information-title">Información del Producto</h1>
          <div className="information-content-wrapper">
            <h2 className={infoList[0] === true ? "information-content-title colored" : "information-content-title"} onClick={() => handleDropInfo(0)} >QUE HACE</h2>
            <div className={ infoList[0] === true ? "information-content dropped" : "information-content" }>
              <p>Los principales beneficios del Aceite de CBD, son sus efectos antiinflamatorios, antidepresivos y relajantes; de hecho con tan solo un par de gotas notarás sus efectos casí de inmediato. Estas carácteristicas particulares del aceite te ayudaran con dolores e irritaciones, desinflamandola la zona a la vez que sientes una relajacion en la misma. También gracias a él, podrás manejar mejor la ansiedad y el estrés, ya que el CBD reduce estos valores en tu cuerpo; por lo que además te ayudara a conciliar mejor el sueño si lo aplicas antes de dormir.</p>
            </div>
          </div>
          <div className="information-content-wrapper">
            <h2 className={infoList[1] === true ? "information-content-title colored" : "information-content-title"} onClick={() => handleDropInfo(1)}>COMO UTILIZARLO</h2>
            <div className={ infoList[1] === true ? "information-content dropped" : "information-content" }>
            <p>En cuanto a como usar el aceite, existen diferentes formas, pero las más conocidas son el uso topico y el uso sublingual.Actualmente en Españá su venta esta restringido al uso topico solamente, por lo que te recomendamos emplear un par de gotas en la zona donde sientas dolor y masajear hasta que el aceite se haya completamente absorvido. Deberías notar los efectos calmantes casí al momento, ten en cuenta que a mayor porcentaje del producto mayor serán sus efectos por lo que para dolores mas agudos te recomendamos usar porcentajes mas altos, o si deseas emplear menos producto cada que vez que lo uses.</p>
            </div>
          </div>
          <div className="information-content-wrapper">
            <h2 className={infoList[2] === true ? "information-content-title colored" : "information-content-title"} onClick={() => handleDropInfo(2)}>INGREDIENTES</h2>
            <div className={ infoList[2] === true ? "information-content dropped" : "information-content" }>
            <p>Como te hemos mencionado el aceite de CBD en España, de momento, solo se puede vender como uso topico, sin embargo este producto en varios paises de la Union Europea y en Estados Unidos ya esta disponible para venta con uso sublinguanl, donde se extrean los grandes beneficios del producto. Esto surgío a raiz de que la OMS lo considerará un suplemento alimenticio beneficioso para el ser humano, donde a continuación la Union Europea lo aprovo de la misma manera.</p> 
            </div>
          </div>
          <div className="information-content-wrapper">
            <h2 className={infoList[3] === true ? "information-content-title colored" : "information-content-title"} onClick={() => handleDropInfo(3)}>COMO RECICLARLO</h2>
            <div className={ infoList[3] === true ? "information-content dropped" : "information-content" }>
            <p>Estos son los principales beneficios que contiene el aceite de CBD, sin embargo todavía hay más carácteristicas de este producto que explicamos más a fondo en uno de nuestros artículos de Rozaday, te recomendamos leerlo para que estes enterado de lo que estas cosumiendo y no tengas dudas al respecto, pincha aquí para leerlo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

cbdPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}


