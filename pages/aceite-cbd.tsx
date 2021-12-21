import { useState } from "react"

export type ProductsProps = {
  oilType: number
  price: number
  selected: number
  finalPrice: number
}


const cbdPage = () => {
  const [amount, setAmount] = useState(1)
  const [price, setPrice] = useState(45)
  const [selected, setSelected] = useState(1)
  var finalPrice = amount * price

  function decrementAmount () {
    if (amount === 1){
      setAmount(prevAmount => prevAmount)
    }
    else {
      setAmount(prevAmount => prevAmount - 1)
    }
  }

  function incrementAmount () {
    setAmount(prevAmount => prevAmount + 1)
  }

  const changeOil = (oilType: number) => {
    if (oilType === 1) {
      setPrice(45)
      setSelected(1)
    }
    else {
      setPrice(60)
      setSelected(2)
    }
    setAmount(1)
  }

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
          <h2 className="product-price mrgtop">{`${finalPrice},00€`}</h2>
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
                <input className="amount-input" type="number" value={amount} disabled="disabled"/>
                <button className="amount-bt bt--minus" onClick={decrementAmount}>-</button>
            </div>
            <button className="product-details-cta">Añadir a la cesta</button> 
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