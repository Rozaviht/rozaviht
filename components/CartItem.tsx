import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CartItemType } from '../services/AppProvider'


type CartItemProps = {
  cartProduct: CartItemType
  removeFromCart: (id: number) => void
}


const CartItem: React.FC<CartItemProps> = ({ removeFromCart, cartProduct}) => {

  const [amountInCart, setAmountInCart] = useState(0)

  useEffect(() =>{
    setAmountInCart(cartProduct.amount)
  }, [cartProduct.amount])


  function decrementAmount () {
    if (amountInCart > 1){
      setAmountInCart(prevAmountInCart => prevAmountInCart - 1)
    }
  }
  function incrementAmount () {
    setAmountInCart(prevAmountInCart => prevAmountInCart + 1)
  } 


  return (
    <div className="cart-item">
      {/* <Image src={'#'} width={200} height={200}></Image> */}
      <h4 className='cart-item-name'>{cartProduct.name}</h4>
      <div className="amount--cart">
        <button className="amount-bt--cart bt--plus" onClick={incrementAmount}>+</button>
        <input className="amount-input--cart" type="number" value={amountInCart} disabled="disabled"/>
        <button className="amount-bt--cart bt--minus" onClick={decrementAmount}>-</button>
      </div>
      <h2 className='cart-item-price'>{`${cartProduct.price},00€`}</h2>
      <button className="close-bt--cart" onClick={() => removeFromCart(cartProduct.id)}>
        <div className="line-left"></div>
        <div className="line-right"></div>
      </button>
    </div>
  )
}

export default CartItem