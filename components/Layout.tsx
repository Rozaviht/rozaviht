import {useContext, useEffect, useState} from 'react'

import { AppContext } from 'services/AppContext'

import TopWarning from '@components/TopWarning'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import CookiesConsent from '@components/CookiesConsent'
import CookiesManage from '@components/CookiesManage'
import useScrollBlock from '@hooks/useScrollBlock'

type LayoutProps = {
  children?: React.ReactNode,
  showCart?:boolean
}

const Layout = ({children}: LayoutProps) => {
  const { showCart } = useContext(AppContext)
  const [blockScroll, allowScroll] = useScrollBlock()

  useEffect(() => {
    if (showCart === true) {
      blockScroll()
    }
    else {
      allowScroll()
    }
  }, [showCart])

  
  return (
    <>
      <TopWarning/>
      <Navbar/>
      {children}
      <CookiesConsent/>
      <CookiesManage/>
      <Footer />
    </>
  )
}

export default Layout