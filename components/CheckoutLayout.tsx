import Link from 'next/link'


import Logo from 'public/img/logo.svg'
import LogoNegative from 'public/img/logo-negative.svg'

type LayoutProps = {
  children?: React.ReactNode
}

export default function checkoutLayout ({children}: LayoutProps) {

  return (
    /* ----CHECKOUT NAVBAR---- */
    <div className="checkoutPage">
      <div className="checkoutPage__nav">
        <Link href="/">
          <a className="goback-link">
            Volver
          </a>
        </Link>
        <div className="checkoutPage__logo">
          <LogoNegative />
        </div>
      </div>
      {children}
      {/* ----CHECKOUT FOOTER---- */}
      <div className="flexcolum flexcolum--around" style={{ 'marginTop': '6rem' }}>
          <div className="footer__logoImg">
            <Logo alt="logo de Rozaviht" />
          </div>
          <p style={{fontSize: "0.6rem"}}>Reservados todos los derechos @ 2022 Rozaviht</p>
          <div className="flexrow">
            <Link href="/privacidad-seguridad" >
              <a style={{borderRight: "1px solid #9b532b", paddingRight: "0.5rem", fontSize: "0.6rem"}}>
                Seguridad y Privacidad
              </a>
            </Link>
            <Link href="/terminos-condiciones">
              <a style={{paddingLeft: "0.5rem", fontSize: "0.6rem"}}>
                Términos y Condiciones
              </a>
            </Link>
          </div>
        </div>
    </div>
  )
}