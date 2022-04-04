import {useEffect, useState} from 'react'
import TopWarning from '@components/TopWarning'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import CookiesConsent from '@components/CookiesConsent'
import CookiesManage from '@components/CookiesManage'
import useScrollBlock from '@hooks/useScrollBlock'

type LayoutProps = {
  children?: React.ReactNode,
  showCart:boolean
}

const Layout = ({children}: LayoutProps) => {
  const [showCart, setShowCart] = useState(false);
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
    <div className="wrapper">
      <TopWarning/>
      <Navbar showCart={showCart} setShowCart={setShowCart} />
      {children}
      <CookiesConsent/>
      <CookiesManage/>
      <Footer />
    </div>
  )
}

export default Layout