import { useContext, Dispatch, SetStateAction } from 'react'
import Link from 'next/link'

import { AppContext } from 'services/AppContext'

import Cart from '@components/Cart'

import Logo from 'public/img/logo.svg'
import CartIcon from 'public/img/cart-icon.svg'


export const getStaticProps = async () => {
  
}

const Navbar = () => {

  const { cartProducts, showCart, setShowCart } = useContext(AppContext)

 

  const handleShowCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShowCart(!showCart)
  } 


  return (
      <div className="navbar">
        <Link href="/">
          <a  className="navbar__logoImg">
            <Logo alt="Logo de Rozaviht"/>
          </a>
        </Link>
        <div className="navbar__menu">
          <Link href="/aceite-cbd" >
            <a>
              Aceite CBD
            </a>
          </Link>
          <Link href="/rozanews" >
            <a>
              Rozanews
            </a>
          </Link>
        </div>
        <button className="navbar__cartBt" onClick={() => setShowCart(!showCart)}>
          <div className="navbar__cartIcon">
            <CartIcon alt="Icono del carrito de la compra de Rozaviht" />
            <div className={cartProducts.length === 0 ? "navbar__cartCounter" : "navbar__cartCounter active"}>{`${cartProducts.length}`}</div>
          </div>
        </button>
        <Cart ifCheckout={false}/>
      </div>
  )
}

export default Navbar