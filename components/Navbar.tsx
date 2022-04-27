import { useContext, Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { AppContext } from 'services/AppContext'

import Cart from '@components/Cart'

import logo from '@img/logo.webp'
import cartIcon from '@img/cart-icon.svg'

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
            <Image src={logo} height={100} width={392} layout="responsive" alt="Logo"/>
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
          <Link href="/about" >
            <a>
              Sobre nosotros
            </a>
          </Link>
        </div>
        <button className="navbar__cartBt" onClick={handleShowCart}>
          <div className="navbar__cartIcon">
            <Image src={cartIcon} alt="Cesta de compra"  width={25} height={25} layout="responsive"/>
            <div className={cartProducts.length === 0 ? "navbar__cartCounter" : "navbar__cartCounter active"}>{`${cartProducts.length}`}</div>
          </div>
        </button>
        <Cart handleShowCart={handleShowCart} showCart={showCart}></Cart>
      </div>
  )
}

export default Navbar