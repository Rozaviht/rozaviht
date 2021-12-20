import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Cart from '@components/Cart'

import Logo from '@img/Logo.svg'
import Cesta from '@img/Cesta.svg'

export type CartProps = {
  showCart: boolean
  handleShowCart: (event: React.MouseEvent<HTMLButtonElement>)=>void
}

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);

  const handleShowCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShowCart(!showCart)
  } 



  return (
    <div className="nav">
      <div className="nav-wrapper">
        <Link href="/">
          <a  className="nav-logo">
            <Image src={Logo} alt="Logo"/>
          </a>
        </Link>
        <button className="nav-cart" onClick={handleShowCart}>
            <Image className="cart" src={Cesta} alt="Cesta de compra"  width={25} height={25}/>
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