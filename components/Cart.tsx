import { CartProps } from '@components/Navbar'
import Image from 'next/image'

import emptyBasket from '@img/empty-basket.svg'


const Cart = ({handleShowCart, showCart}: CartProps) => {


  return (
    <div className={showCart ? "cart dropped" : "cart"}>
      <button className="close-bt" onClick={handleShowCart}>
        <div className="line-left"></div>
        <div className="line-right"></div>
      </button>
      <h2>Tu cesta de la compra</h2>
      <div className="containerflx--column">
        <div className="empty-cart">
          <div className="empty-cart-text">
            <h3>!Vaya¡</h3>
            <h3>Tu cesta de la compra esta vacía</h3>
          </div>
          <Image src={emptyBasket} width={200} height={200}/>
        </div>
      </div>
    </div>
  )
}
  
export default Cart