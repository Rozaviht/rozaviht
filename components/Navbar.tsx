import React, { useState, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { AppContext } from 'services/AppContext'

import Cart from '@components/Cart'
import Logo from '@img/Logo.svg'
import CartIcon from '@img/cartIcon3.svg'



const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  
  const { cartProducts } = useContext(AppContext)
  console.log(cartProducts)

 

  const handleShowCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShowCart(!showCart)
  } 


  return (
    <div className="nav">
      <div className="nav-wrapper">
        <Link href="/">
          <a  className="nav-logo">
            <Image src={Logo} height={100} width={392} layout="responsive" alt="Logo"/>
          </a>
        </Link>
        <button className="nav-cart" onClick={handleShowCart}>
          <div className="nav-cart-container">
            <Image src={CartIcon} alt="Cesta de compra"  width={25} height={25} layout="responsive"/>
            <div className={cartProducts.length === 0 ? "products-counter" : "products-counter active"}>{`${cartProducts.length}`}</div>
          </div>
        </button>
        <div className="nav-menu">
          <Link href="/aceite-cbd" >
            <a className="nav-menu-item">
              Aceite CBD
            </a>
          </Link>
          <Link href="/rozaday" >
            <a className="nav-menu-item">
              Rozaday
            </a>
          </Link>
          <Link href="/about" >
            <a className="nav-menu-item">
              Sobre nosotros
            </a>
          </Link>
        </div>
        <Cart handleShowCart={handleShowCart} showCart={showCart}></Cart>
      </div>
    </div>
  )
}

export default Navbar