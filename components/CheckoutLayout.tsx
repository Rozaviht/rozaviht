import Image from 'next/image'
import Link from 'next/link'

import CheckoutSteps from './CheckoutSteps'

import LogoNegative from '@img/logo-negative3.svg'

type LayoutProps = {
  children?: React.ReactNode
}

export default function checkoutLayout ({children}: LayoutProps) {
  return (
    <div className="checkout-wrapper">
      <div className="checkout-nav">
        <Link href="/">
          <a className="goback-link">
            Volver
          </a>
        </Link>
        <div className="checkoutlogo-container">
          <Image src={LogoNegative} height={100} width={392} layout="responsive" />
        </div>
      </div>
      <CheckoutSteps/>
      {children}
    </div>
  )
}