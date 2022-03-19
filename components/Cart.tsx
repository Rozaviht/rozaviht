import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { AppContext } from 'services/AppContext'

import CartItem from './CartItem'

import emptyBasket from '@img/empty-cart.svg'
import Logo from '@img/Logo.svg'

export type CartProps = {
  showCart: boolean
  handleShowCart: (event: React.MouseEvent<HTMLButtonElement>)=>void
}


const Cart = ({handleShowCart, showCart}: CartProps) => {
  const [totalCartPrice, setTotalCartPrice] = useState<number>()

  const { cartProducts, setCartProducts } = useContext(AppContext)

  const handleRemoveFromCart = (productId: number) => {
    let elementProduct = cartProducts.find(element => element.id === productId)
    setCartProducts(() =>
      cartProducts.filter(function(element) {
        return element != elementProduct
      })
    );
  };

  useEffect(() => {
    setTotalCartPrice(cartProducts.reduce((ack: number, item) => ack + item.amount * item.price, 0))
  }, [cartProducts])


  return (
    <div className={showCart ? "cart dropped" : "cart"}>
      <div>
        <button className="close-bt" onClick={handleShowCart}>
          <div className="line-left"></div>
          <div className="line-right"></div>
        </button>
        <div className="logo-cart-container">
          <Image src={Logo} height={30} width={80} layout="responsive"></Image>
        </div>
        <h2 className="cart-title">Tu cesta de la compra</h2>
      </div>
      <div className="containerflx--column extra-pd">
        { cartProducts.length === 0
          ?
            <div className="empty-cart">
              <div className="empty-cart-text-wrapper">
                <h1 className="empty-cart-text">! Ups Vaya¡</h1>
                <h2 className="empty-cart-text">Tu cesta de la compra esta vacía, que esperas para llenarla</h2>
              </div>
              <Image src={emptyBasket} width={200} height={200}/>
            </div>
          :
            <div className="cart-items-container">
              {cartProducts.map(item => (
                <CartItem
                  key={item.id}
                  cartProduct={item}
                  removeFromCart={handleRemoveFromCart}
                />
                ))}
              <div className="total-price-container">
                <div className="total-price">
                  <h3 className="total-price-text">Total en tu cesta:</h3>
                  <h3 className="total-price-number">{totalCartPrice},00€</h3>
                </div>
                <button className="cart-cta-buy">
                  <Link href="/checkout">
                    <a>
                      COMPRAR
                    </a>
                  </Link>
                  </button>
              </div>
            </div>
        }
      </div>
    </div>
  )
}


export default Cart