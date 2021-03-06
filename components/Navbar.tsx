import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'

import { AppContext } from 'services/AppContext'

import Cart from '@components/Cart'

import Logo from 'public/img/logo.svg'
import LogoNegative from 'public/img/logo-negative.svg'
import CartIcon from 'public/img/cart-icon.svg'
import CartIconNegative from 'public/img/cart-icon-negative.svg'


export const getStaticProps = async () => {
  
}

const Navbar = () => {

  const [rozanewsMode, setRozanewsMode] = useState(false)

  const { cartProducts, showCart, setShowCart } = useContext(AppContext)

  useEffect(() => {
    let AllChangeableNavElements: NodeListOf<HTMLDivElement> = document.querySelectorAll(".navbar, .navbar__menu, .navbar__cartCounter")!
    if(window.location.pathname === '/rozanews' ) {
      AllChangeableNavElements.forEach(object => {
        object.classList.add("rozanewsMode")
      })
      setRozanewsMode(true)
    } else {
      AllChangeableNavElements.forEach(object => {
        object.classList.remove("rozanewsMode")
      })
      setRozanewsMode(false)
    }
  })

  return (
      <div className="navbar">
        <Link href="/">
          <a  className="navbar__logoImg">
            {rozanewsMode === true ? <LogoNegative alt="Logo de Rozaviht en blanco" /> : <Logo alt="Logo de Rozaviht"/>}
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
            {rozanewsMode === true ? <CartIconNegative  alt="Icono del carrito de la compra de Rozaviht en blanco" /> : <CartIcon alt="Icono del carrito de la compra de Rozaviht" />}
            <div className={cartProducts.length === 0 ? "navbar__cartCounter" : "navbar__cartCounter active"}>{`${cartProducts.length}`}</div>
          </div>
        </button>
        <Cart ifCheckout={false}/>
      </div>
  )
}

export default Navbar