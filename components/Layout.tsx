import React from 'react'
import TopWarning from '@components/TopWarning'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import CookiesConsent from '@components/CookiesConsent'
import CookiesManage from '@components/CookiesManage'

type LayoutProps = {
  children?: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div className="wrapper">
{/*       <TopWarning/> */}
      <Navbar />
      {children}
      <CookiesConsent/>
      <CookiesManage/>
      <Footer />
    </div>
  )
}

export default Layout