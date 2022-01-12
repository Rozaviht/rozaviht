import { useContext } from 'react'
import Image from 'next/image'

import { AppContext } from 'services/AppContext'

import { CartProps } from '@components/Navbar'
import CartItem from './CartItem'

import emptyBasket from '@img/empty-basket.svg'

import { CartItemType } from 'services/AppProvider'


const Cart = ({handleShowCart, showCart}: CartProps) => {

  const { cartProducts, setCartProducts } = useContext(AppContext)

  const handleRemoveFromCart = (productId: number) => {
    let elementProduct = cartProducts.find(element => element.id === productId)
    setCartProducts(() =>
      cartProducts.filter(function(element) {
        return element != elementProduct
      })
    );
  };


  return (
    <div className={showCart ? "cart dropped" : "cart"}>
      <button className="close-bt" onClick={handleShowCart}>
        <div className="line-left"></div>
        <div className="line-right"></div>
      </button>
      <h2 className="cart-title">Tu cesta de la compra</h2>
      <div className="containerflx--column extra-pd">
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
              <CartItem
                key={item.id}
                cartProduct={item}
                removeFromCart={handleRemoveFromCart}
              />
            ))
        }
      </div>
    </div>
  )
}


export default Cart