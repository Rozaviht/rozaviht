import { useState, useContext } from 'react'
import Image from 'next/image'

import { AppContext } from 'services/AppContext'

import { CartProps } from '@components/Navbar'
import CartItem from './CartItem'

import emptyBasket from '@img/empty-basket.svg'


const Cart = ({handleShowCart, showCart}: CartProps) => {

  const { cartProducts } = useContext(AppContext)

  console.log(cartProducts)
  return (
    <div className={showCart ? "cart dropped" : "cart"}>
      <button className="close-bt" onClick={handleShowCart}>
        <div className="line-left"></div>
        <div className="line-right"></div>
      </button>
      <h2>Tu cesta de la compra</h2>
      <div className="containerflx--column">
        { cartProducts.length === 0
          ?
            <div className="empty-cart">
              <div className="empty-cart-text">
                <h3>!Vaya¡</h3>
                <h3>Tu cesta de la compra esta vacía</h3>
              </div>
              <Image src={emptyBasket} width={200} height={200}/>
            </div>
          :
            cartProducts.map(item => (
              {/* <CartItem
                removeFromCart={handleRemoveFromCart}
              /> */}
            ))
              
        }
      </div>
    </div>
  )
}


export default Cart