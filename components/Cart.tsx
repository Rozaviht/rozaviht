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

  const { cartProducts, totalCartPrice } = useContext(AppContext)

  return (
    <div className={showCart ? "cart cart--showed" : "cart"}>
      <div className="flexcolum flexcolum--around">
        <button className="closeBtSlide closeBtSlide--topLeft" onClick={handleShowCart}>
          <div className="closeBtSlide__lineT"></div>
          <div className="closeBtSlide__lineC"></div>
          <div className="closeBtSlide__lineB"></div>
        </button>
        <div className="cart__logoImg">
          <Image src={Logo} height={30} width={80} layout="responsive"></Image>
        </div>
        <h2 className="h--maincolor">Tu cesta de la compra</h2>
      </div>
      <div className="flexcolum flexcolum--around">
        { cartProducts.length === 0
          ?
            <>
                <h1>! Ups Vaya¡</h1>
                <h2 className="h--aligncenter">Tu cesta de la compra esta vacía, que esperas para llenarla</h2>
                <div className="cart__emptyImg">
                  <Image src={emptyBasket} width={200} height={200} layout="responsive"/>
                </div>
            </>
          :
            <>
              {cartProducts.map(item => (
                <CartItem
                  key={item.id}
                  cartProduct={item}
                />
                ))}
              <div className="flexcolum flexcolum--around">
                <div className="flexrow">
                  <h2>Total en tu cesta:</h2>
                  <h2 style={{marginLeft: "2rem"}}>{totalCartPrice},00€</h2>
                </div>
                <Link href="/checkout">
                  <button className="cta cta--maincolor">
                    <a className="link-negative">
                      COMPRAR
                    </a>
                  </button>
                </Link>
              </div>
            </>
        }
      </div>
    </div>
  )
}


export default Cart