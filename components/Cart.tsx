import { useContext } from 'react'
import Link from 'next/link'

import { AppContext } from 'services/AppContext'

import CartItem from './CartItem'

import EmptyBasket from 'public/img/empty-cart-image.svg'
import Logo from 'public/img/logo.svg'



const Cart = ({ifCheckout}: {ifCheckout: boolean}) => {

  const { cartProducts, totalCartPrice, showCart, setShowCart } = useContext(AppContext)

  return (
    <div className={showCart ? "cart cart--showed" : "cart"}>
      <div className="flexcolum flexcolum--around">
        <button className="closeBtSlide closeBtSlide--topLeft" onClick={() => setShowCart(!showCart)}>
          <div className="closeBtSlide__lineT"></div>
          <div className="closeBtSlide__lineC"></div>
          <div className="closeBtSlide__lineB"></div>
        </button>
        <div className="cart__logoImg">
          < Logo alt="Logo de Rozaviht"/>
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
                  <EmptyBasket />
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
                { ifCheckout === false ?
                  <Link href="/checkout" >
                    <a className="link-cta" onClick={() => setShowCart(false)}>
                      COMPRAR
                    </a>
                </Link>
                  : <></>}
              </div>
            </>
        }
      </div>
    </div>
  )
}


export default Cart