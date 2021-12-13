import { CartProps } from "./Navbar"

const Cart = ({handleShowCart, showCart}: CartProps) => {


  return (
    <div className={showCart ? "basket-slide dropped" : "basket-slide"}>
      <button className="close-bt" onClick={handleShowCart}>
        <div className="line-left"></div>
        <div className="line-right"></div>
      </button>
      <h2>Tu cesta de la compra</h2>
      <div className="empty-basket">
        <h3>!Vaya¡ Tu cesta de la compra esta vacía</h3>
      </div>
    </div>
  )
}
  
export default Cart