import { useState } from 'react'
import Image from 'next/image'
import { CartItemType } from './Cart'

type CartItemProps = {
  cartProduct: CartItemType
  removeFromCart: (id: number) => void
}


const CartItem: React.FC<CartItemProps> = ({removeFromCart, cartProduct}) => {
  const [cartItemAmount, setCartItemAmount] = useState(1 as number)


  function decrementAmount () {
    if (cartItemAmount > 1){
      setCartItemAmount(prevCartItemAmount => prevCartItemAmount - 1)
    }
  }
  function incrementAmount () {
    setCartItemAmount(prevCartItemAmount => prevCartItemAmount + 1)
  }

  return (
    <div className="cart-item">
      <Image src={'#'} width={200} height={200}></Image>
      <h4 className='cart-item-title'></h4>
      <h4 className='cart-item-price'></h4>
      <div className="amount">
        <button className="amount-bt bt--plus" onClick={incrementAmount}>+</button>
        <input className="amount-input" type="number" value={cartItemAmount} disabled="disabled"/>
        <button className="amount-bt bt--minus" onClick={decrementAmount}>-</button>
      </div>
      <button className="close-bt" onClick={() => removeFromCart(cartProduct.id)}>
        <div className="line-left"></div>
        <div className="line-right"></div>
      </button>
    </div>
  )
}

export default CartItem