import Link from 'next/link'



const Navbar = () => {
  return (
    <div className="nav">
    <div className="nav-wrapper">
      <Link href="/">
        <a  className="nav-logo">
          <img  className="logo"  src={''} alt="Logo" />
        </a>
      </Link>
      <div className="nav-menu">
        <Link href="/aceite-cbd" >
          <a className="nav-menu-item">
          Aceite CBD
          </a>
        </Link>
        <Link href="/rozaday" >
          <a className="nav-menu-item">
            Rozaday
          </a>
        </Link>
        <Link href="/about" >
          <a className="nav-menu-item">
            Sobre nosotros
          </a>
        </Link>
      </div>
    </div>
  </div>
  )
}

export default Navbar