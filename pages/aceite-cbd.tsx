import { useState, useContext } from "react"
import prisma from '../lib/prisma'
import { CartItemType } from "../services/AppProvider"
import { AppContext } from 'services/AppContext'

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
  const [currentPrice, setCurrentPrice] = useState(ProductDetails[0].price)
  const [selected, setSelected] = useState(ProductDetails[0].id)
  const [currentName, setCurrentName] = useState(ProductDetails[0].name)
  
  var currentProduct = {
    id : selected,
    price: currentPrice,
    name: currentName,
    amount: amountSelected
  }
  var totalAmountPrice: number = amountSelected * currentPrice

  const { setCartProducts } = useContext( AppContext )


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
  };



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


