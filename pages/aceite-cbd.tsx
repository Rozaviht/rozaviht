import { useState, useContext, useEffect } from "react"
import prisma from '../lib/prisma'
import Image from 'next/image'

import { CartItemType } from "../services/AppProvider"
import { AppContext } from 'services/AppContext'

import type { ReactElement } from "react"

import ProductImageSlider from '@components/ProductImageSlider'
import Layout from "@components/Layout"
import AddedToCartPopUp from "@components/AddedToCartPopUp"

import MartaBañoAceite from '@img/marta-aceite-baño.jpg'
import ingredientsImage from '@img/img-cbd-page.png'

interface props  {
  ProductDetails : [
    {
      id: number
      price: number
      name: string
    }
  ]
}

export type productAddedType = {
  name: string
}


export const getStaticProps = async () => {
  const ProductDetails = await prisma.product.findMany({
    select: {
      id: true,
      price: true,
      name: true
    }
    })
    return {
      props: { ProductDetails }
    }
  }






export default function cbdPage ({ ProductDetails}: props) {
  const { setCartProducts } = useContext( AppContext )

  const [amountSelected, setAmountSelected] = useState(1)
  const [currentPrice, setCurrentPrice] = useState(ProductDetails[0].price)
  const [selected, setSelected] = useState(ProductDetails[0].id)
  const [currentName, setCurrentName] = useState(ProductDetails[0].name)
  const [listDropped, setListDropped] = useState([false, false, false, false])
  const [productAdded, setProductAdded] = useState<productAddedType>({} as productAddedType)
  const [showAddedPopUp, setShowAddedPopUp] = useState(false)
  
  var currentProduct = {
    id : selected,
    price: currentPrice,
    name: currentName,
    amount: amountSelected
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
        setCurrentPrice(ProductDetails[0].price)
        setSelected(ProductDetails[0].id)
        setCurrentName(ProductDetails[0].name)
        
      }
      else {
        setCurrentPrice(ProductDetails[1].price)
        setSelected(ProductDetails[1].id)
        setCurrentName(ProductDetails[1].name)
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

    setProductAdded({
      name: clickedItem.name
    })
    
    setShowAddedPopUp(true)
  };

  return(
    <div className="product-page">
      <AddedToCartPopUp productAdded={productAdded} showAddedPopUp={showAddedPopUp} setShowAddedPopUp={setShowAddedPopUp}/>
      <div className="product-details">
        <ProductImageSlider></ProductImageSlider>
        <div className="container--flexcolumn">
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
            <button className="product-details-cta" onClick={() => handleAddToCart(currentProduct)}>
              <div className="cta-plus">
                <div className="cta-plus-line"></div>
                <div className="cta-plus-line"></div>
              </div>
              <h4 className="product-details-cta-text">
                Añadir a la cesta
              </h4>
            </button> 
          </div>
          <p className="delivery-info">Envío Estandar (1,5€):  3 a 5 días laborales</p>
          <p className="delivery-info">Envío Express (3€):  2 a 3 días laborales</p>
          <p className="delivery-info">Envíos de momento solo España Península</p>
        </div>
      </div>
      <div className="product-ingredients">
        <div className="ingredients-image">
          <Image src={ingredientsImage} height={1.7} width={1} layout="responsive"/>
        </div>
      </div>
      {/* PRODCUT INFORMATION */}
      <div className="product-information">
        <div className="text-container">
          <h1 className="product-information-title">Información del Producto</h1>
          <div className="information-content-wrapper">
            <h2 className={listDropped ? "information-content-title colored" : "information-content-title"} >QUE HACE</h2>
            <div className={ listDropped ? "information-content dropped" : "information-content" }>
              <p>Los principales beneficios del Aceite de CBD, son sus efectos antiinflamatorios, antidepresivos y relajantes; de hecho con tan solo un par de gotas notarás sus efectos casí de inmediato. Estas carácteristicas particulares del aceite te ayudaran con dolores e irritaciones, desinflamandola la zona a la vez que sientes una relajacion en la misma. También gracias a él, podrás manejar mejor la ansiedad y el estrés, ya que el CBD reduce estos valores en tu cuerpo; por lo que además te ayudara a conciliar mejor el sueño si lo aplicas antes de dormir.</p>
            </div>
          </div>
          <div className="information-content-wrapper">
            <h2 className={listDropped ? "information-content-title colored" : "information-content-title"}>COMO UTILIZARLO</h2>
            <div className={ listDropped ? "information-content dropped" : "information-content" }>
            <p>En cuanto a como usar el aceite, existen diferentes formas, pero las más conocidas son el uso topico y el uso sublingual.Actualmente en Españá su venta esta restringido al uso topico solamente, por lo que te recomendamos emplear un par de gotas en la zona donde sientas dolor y masajear hasta que el aceite se haya completamente absorvido. Deberías notar los efectos calmantes casí al momento, ten en cuenta que a mayor porcentaje del producto mayor serán sus efectos por lo que para dolores mas agudos te recomendamos usar porcentajes mas altos, o si deseas emplear menos producto cada que vez que lo uses.</p>
            </div>
          </div>
          <div className="information-content-wrapper">
            <h2 className={listDropped ? "information-content-title colored" : "information-content-title"}>INGREDIENTES</h2>
            <div className={ listDropped ? "information-content dropped" : "information-content" }>
            <p>Como te hemos mencionado el aceite de CBD en España, de momento, solo se puede vender como uso topico, sin embargo este producto en varios paises de la Union Europea y en Estados Unidos ya esta disponible para venta con uso sublinguanl, donde se extrean los grandes beneficios del producto. Esto surgío a raiz de que la OMS lo considerará un suplemento alimenticio beneficioso para el ser humano, donde a continuación la Union Europea lo aprovo de la misma manera.</p> 
            </div>
          </div>
          <div className="information-content-wrapper">
            <h2 className={listDropped ? "information-content-title colored" : "information-content-title"}>COMO RECICLARLO</h2>
            <div className={ listDropped ? "information-content dropped" : "information-content" }>
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


