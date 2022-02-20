import React from 'react'
import TopWarning from '@components/TopWarning'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'

type LayoutProps = {
  children?: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div className="wrapper">
{/*       <TopWarning/> */}
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout