import Link from 'next/link'

import CheckoutSteps from './CheckoutSteps'

import LogoNegative from '@img/logo-negative.svg'

type LayoutProps = {
  children?: React.ReactNode
}

export default function checkoutLayout ({children}: LayoutProps) {

  return (
    /* ----CHECKOUT NAVBAR---- */
    <div className="checkout-wrapper">
      <div className="checkout-nav">
        <Link href="/">
          <a className="goback-link">
            Volver
          </a>
        </Link>
        <div className="checkoutlogo-container">
          <LogoNegative />
        </div>
      </div>
      {children}
      {/* ----CHECKOUT FOOTER---- */}
      <div className="footer-legal">
          <div className="footer-legal-issues">
            <p>Reservados todos los derechos @ 2021 Rozaviht</p>
            <div className="legal-links">
              <Link href="/">
                <a>
                  Seguridad y Privacidad
                </a>
              </Link>
              <Link href="/">
                <a>
                  Términos y Condiciones
                </a>
              </Link>
              <Link href="/">
                <a>
                  Servicio
                </a>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}