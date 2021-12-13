import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Cart from './Cart'

import Logo from '@img/Logo.svg'
import Cesta from '@img/Cesta.svg'

export type CartProps = {
  showCart: boolean
  handleShowCart: boolean
}

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);

  const handleShowCart = () => {
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
      <button className="nav-basket" onClick={handleShowCart}>
          <Image className="basket" src={Cesta} alt="Cesta de compra"  width={25} height={25}/>
        </button>
      <Cart handleShowCart={handleShowCart} showCart={showCart} />
    </div>
  </div>
  )
}

export default Navbar