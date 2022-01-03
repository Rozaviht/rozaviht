import { useState } from "react"
import prisma from '../lib/prisma'

/* export type ProductsProps = {
  oilType: number;
  price: number;
  selected: number;
  finalPrice: number;
} */

export type CartItemType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  amountSelected: number;
  amount: number
}

export type ProductProps = {
  id: number
  name: string
  description: string
  price: number
}

export const getStaticProps = async () => {
  const ProductDetails: ProductProps[] = await prisma.product.findMany({
    })
    return {
      props: { ProductDetails }
    }
  }





const cbdPage = ({ProductDetails}) => {
  const [cartProducts, setCartProducts] = useState([] as CartItemType[])
  const [amountSelected, setAmountSelected] = useState(1)
  const [price, setPrice] = useState(ProductDetails.price)
  const [selected, setSelected] = useState(1 as number)
  var totalAmountPrice: number = amountSelected * price


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
      setPrice(ProductDetails.price)
      setSelected(1)
    }
    else {
      setPrice(60)
      setSelected(2)
    }
    setAmountSelected(1)
  }

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartProducts(prev => {
      /* 1. Is the item already add in the cart? */
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if (isItemInCart) {
        return prev.map(item =>
            item.id === clickedItem.id
              ? {...item, amount: item.amount + 1}
              : item
          )
      }

      /* First time the item is added */
      return[...prev, { ...clickedItem, amount: 1}]
    })
  }

  return(
    <div className="product-page">
      <div className="product-details">
        <div className="product-details-imgs">
          <img src="" alt="" />
        </div>
        <div className="container--flexcolumn">
          <h1 className="product-title">{ProductDetails.name}</h1>
          <p>0% THC | 10ml</p>
          <p className="p--textCenter mrgtop">
            {ProductDetails.description}
          </p>
          <h2 className="product-price mrgtop">{`${totalAmountPrice},00€`}</h2>
          <div className="oil-percentage">
            <h3>Porcentaje:</h3>
            <div className="oil-percentage-list">
              <div 
              className={selected === 1 ? "oil-percentage-list-item selected" : "oil-percentage-list-item"}
              onClick={() => changeOil(1)}
              >10%</div>
              <div 
              className={selected === 2 ? "oil-percentage-list-item selected" : "oil-percentage-list-item"}
              onClick={() => changeOil(2)}
              >20%</div>
            </div>
          </div>
          <div className="container--flexrow">
            <div className="amount">
                <button className="amount-bt bt--plus" onClick={incrementAmount}>+</button>
                <input className="amount-input" type="number" value={amountSelected} disabled="disabled"/>
                <button className="amount-bt bt--minus" onClick={decrementAmount}>-</button>
            </div>
            <button className="product-details-cta" onClick={() => handleAddToCart(product)}>Añadir a la cesta</button> 
          </div>
          <p className="delivery-info">Tiempo de envío de 3 a 7 días laborales</p>
        </div>
      </div>
      <div className="product-ingredients"></div>
      <div className="product-info"></div>
    </div>
  )
}

export default cbdPage


