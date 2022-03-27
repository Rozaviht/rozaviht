import { useContext } from 'react'
import Image from 'next/image'
import { CartItemType } from '../services/AppProvider'
import { AppContext } from 'services/AppContext'

import aceite10 from '@img/aceite10-concaja.png'

export type CartItemProps = {
  cartProduct: CartItemType
}

const CartItem = ({cartProduct}: CartItemProps) => {

  const { setCartProducts, handleRemoveFromCart } = useContext(AppContext)

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
          item.id === clickedItem.id && item.amount > 1
            ? { ...item, amount: item.amount - 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };


  return (
    <div className="cart-item">
      <div className="image-cartitem-container">
        <Image src={aceite10} width={200} height={200} layout='responsive'></Image>
      </div>
      <p className="p-name">Producto:</p>
      <p className='cart-item-name'>{cartProduct.name}</p>
      <button className="close-bt--cart" onClick={() => handleRemoveFromCart(cartProduct.id)}>
        <div className="line-left"></div>
        <div className="line-right"></div>
      </button>
      <p className="p-price">Precio:</p>
      <p className='cart-item-price'>{`${totalItemPrice},00€`}</p>
      <p className="p-amount">Cantidad:</p>
      <div className="amount--cart">
        <button className="amount-bt--cart bt--minus" onClick={()=>decrementAmount(cartProduct)}>-</button>
        <input className="amount-input--cart" type="number" value={cartProduct.amount} disabled="disabled"/>
        <button className="amount-bt--cart bt--plus" onClick={()=>incrementAmount(cartProduct)}>+</button>
      </div>
    </div>
  )
}

export default CartItem