import { Dispatch, SetStateAction, useState, useContext } from "react"
import prisma from '../lib/prisma'
import { CartItemType } from "../services/AppProvider"
import { AppContext } from 'services/AppContext'

/* export type ProductsProps = {
  oilType: number;
  price: number;
  selected: number;
  finalPrice: number;
} */

interface props  {
  ProductDetails : [
    {
      id: number
      price: number
      name: string
    }
  ]
}

export type CurrentProductProps = {
    currentId: number
    currentPrice: number
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





const cbdPage = ({ProductDetails}: props) => {
  const [amountSelected, setAmountSelected] = useState(1)
  const [price, setPrice] = useState(ProductDetails[0].price)
  const [selected, setSelected] = useState(ProductDetails[0].id)
  const [currentProduct, setCurrentProduct] = useState({} as CartItemType)
  /*     id: selected,
      price: price,
      name: ProductDetails[0].name,
      amount: 0 */
  var totalAmountPrice: number = amountSelected * price

  const { setCartProducts } = useContext( AppContext )

  /* handles functions */


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
      setPrice(ProductDetails[0].price)
      setSelected(ProductDetails[0].id)
      
    }
    else {
      setPrice(ProductDetails[1].price)
      setSelected(ProductDetails[1].id)
    }
    setAmountSelected(1)
  }


  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartProducts(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + amountSelected }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: amountSelected }];
    });
  };




/*  */



  return(
    <div className="product-page">
      <div className="product-details">
        <div className="product-details-imgs">
          <img src="" alt="" />
        </div>
        <div className="container--flexcolumn">
          <h1 className="product-title">Aceite de CBD</h1>
          <p>0% THC | 10ml</p>
          <p className="p--textCenter mrgtop">
            Siente relajación y bienestar al usar nuestro aceite de CBD. No contiene nada de THC, es completamente natural y vegano.
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
                <input className="amount-input" type="number" value={amountSelected} data-disabled="disabled"/>
                <button className="amount-bt bt--minus" onClick={decrementAmount}>-</button>
            </div>
            <button className="product-details-cta" onClick={() => handleAddToCart(currentProduct)}>Añadir a la cesta</button> 
          </div>
          <p className="delivery-info">Tiempo de envío de 3 a 7 días laborales</p>
          <p className="delivery-info">Envíos de, momento, solo peninsulares</p>
        </div>
      </div>
      <div className="product-ingredients"></div>
      <div className="product-info"></div>
    </div>
  )
}

export default cbdPage


