import { useContext, Dispatch, SetStateAction } from 'react'
import Link from 'next/link'

import { AppContext } from 'services/AppContext'

import Cart from '@components/Cart'

import Logo from '@img/logo.svg'
import CartIcon from '@img/cart-icon.svg'

type NavbarProps = {
  showCart: boolean,
  setShowCart: Dispatch<SetStateAction<boolean>>
}

export const getStaticProps = async () => {
  
}

const Navbar = ({showCart, setShowCart}: NavbarProps) => {

  const { cartProducts } = useContext(AppContext)

 

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
        <button className="navbar__cartBt" onClick={handleShowCart}>
          <div className="navbar__cartIcon">
            <CartIcon alt="Icono del carrito de la compra de Rozaviht" />
            <div className={cartProducts.length === 0 ? "navbar__cartCounter" : "navbar__cartCounter active"}>{`${cartProducts.length}`}</div>
          </div>
        </button>
        <Cart handleShowCart={handleShowCart} showCart={showCart} setShowCart={setShowCart}></Cart>
      </div>
  )
}

export default Navbar