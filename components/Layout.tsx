import React from 'react'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'

const Layout: React.FC = ({children}) => {
  return (
    <div className="wrapper">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout