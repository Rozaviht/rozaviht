import { useContext, useState } from 'react'
import Image from 'next/image'
import { CartItemType } from '../services/AppProvider'
import { AppContext } from 'services/AppContext'


type CartItemProps = {
  removeFromCart: (id: number) => void
  cartProduct: CartItemType
}


const CartItem: React.FC<CartItemProps> = ({ removeFromCart, cartProduct}) => {

  const { setCartProducts } = useContext(AppContext)

  var totalItemPrice = cartProduct.amount * cartProduct.price

  const incrementAmount = (clickedItem: CartItemType) => {
    setCartProducts(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  
  const decrementAmount = (clickedItem: CartItemType) => {
    setCartProducts(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount - 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };


  return (
    <div className="cart-item">
      {/* <Image src={'#'} width={200} height={200}></Image> */}
      <h4 className='cart-item-name'>{cartProduct.name}</h4>
      <div className="amount--cart">
        <button className="amount-bt--cart bt--plus" onClick={()=>incrementAmount(cartProduct)}>+</button>
        <input className="amount-input--cart" type="number" value={cartProduct.amount} disabled="disabled"/>
        <button className="amount-bt--cart bt--minus" onClick={()=>decrementAmount(cartProduct)}>-</button>
      </div>
      <h2 className='cart-item-price'>{`${totalItemPrice},00€`}</h2>
      <button className="close-bt--cart" onClick={() => removeFromCart(cartProduct.id)}>
        <div className="line-left"></div>
        <div className="line-right"></div>
      </button>
    </div>
  )
}

export default CartItem