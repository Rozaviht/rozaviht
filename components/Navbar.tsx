import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'

import { AppContext } from 'services/AppContext'

import Cart from '@components/Cart'

import Isotipo from 'public/img/isotipo.svg'
import Logo from 'public/img/logo.svg'
import LogoNegative from 'public/img/logo-negative.svg'
import RozanewsIsotipo from 'public/img/rozanews-isotipo-maincolor.svg'
import OilIsotipo from 'public/img/oil-illustration-maincolor.svg'
import CartIcon from 'public/img/cart-icon.svg'
import CartIconNegative from 'public/img/cart-icon-negative.svg'
import useScrollDirection from '@hooks/useScrollDirection'
import TopWarning from './TopWarning'


const Navbar = () => {
  const [rozanewsMode, setRozanewsMode] = useState(false)
  const [mobileMode, setMobileMode] = useState<boolean>()

  const { cartProducts, showCart, setShowCart } = useContext(AppContext)

  const scrollDirection = useScrollDirection()


/*   useEffect(() => {
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
  }) */

  useEffect(() => {
/*     var windowWidth640 = window.matchMedia(' (max-width: 640px) ') */
    var windowWidth960 = window.matchMedia(' (max-width: 960px) ')

    if (windowWidth960.matches) {
      setMobileMode(true)

    } else {
      setMobileMode(false)

    }

/*     window.addEventListener('resize', () => {
      var windowWidth960 = window.matchMedia(' (max-width: 960px) ')
  
      if (windowWidth960.matches) {
        setMobileMode(true)
      } else {
        setMobileMode(false)
      }
    })

    return () => {
      document.removeEventListener("resize", () => {});
    }; */
  }, [])

  return (
    <div className={scrollDirection === "down" ? "navbar hide" : "navbar"}>
      <TopWarning/>
      <div className="navbar__menu" >
        <Link href="/">
          <a  className="navbar__logoImg">
            {mobileMode === true ?
              <Isotipo alt="Isotipo de Rozaviht" />
              : /* rozanewsMode === true ?
                <LogoNegative alt="Logo de Rozaviht en blanco" />
                : */
                <Logo alt="Logo de Rozaviht"/>}
          </a>
        </Link>
        <div className="navbar__links">
          <Link href="/aceite-cbd" >
            { mobileMode === true 
              ?
                <div className='flexcolum flexcolum--nopd flexcolum--around' >
                  <OilIsotipo alt="Ilustracion de aceite" style={{width: "15px"}} />
                  <a>Aceite CBD</a>
                </div>
              :
                <a>Aceite CBD</a>
            }
          </Link>
          <Link href="/rozanews" >
            { mobileMode === true 
              ?
                <div className='flexcolum flexcolum--nopd flexcolum--around' >
                  <RozanewsIsotipo alt="Ilustracion de aceite" style={{width: "30px"}} />
                  <a>Rozanews</a>
                </div>
              :
                <a>Rozanews</a>
            }
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
    </div>
  )
}

export default Navbar