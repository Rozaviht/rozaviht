import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Logo from '@img/Logo.svg'
import instagramIcon from '@img/instagram-icon.svg'
import facebookIcon from '@img/facebook-icon.svg'

const Footer = () => {
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)

  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div className="footer-email-sub">
          <h2 className="footer-email-sub-title">¡Únete a la comunidad!</h2>
          <div className="footer-email-sub-text">
            <p >
              Mantente enterado de nuestras novedades, y tranquilo solo te escribiremos cuando publiquemos 
              nuevos artículos o saquemos un nuevo producto.
            </p>
            <p>
              No haremos spam, no es ecológico.
            </p>
            <p>
              Tus datos personales se usarán tal y como se describe en nuestra
              <Link href="/">
                <a className="footer-email-sub-text-link">
                  Política de Privacidad
                </a>
              </Link>.
            </p>
          </div>
          <input type="mail" placeholder="Introduce aquí tu correo electrónico" className="footer-email-sub-input"/>
          <button className="footer-email-sub-bt">UNIRSE</button>
        </div>
        <div className="footer-down-side-wrapper">
          <div className="footer-left-side">
            <div className="footer-left-side-column" >
              <h6  className={click ? "footer-left-side-column-title showed" : "footer-left-side-column-title"} onClick={handleClick}> Atención al cliente</h6>
              <div className={click ? "footer-left-side-column-section showed" : "footer-left-side-column-section"}>
                <ul className="footer-left-side-column-section-list">
                  <li className="footer-left-side-column-section-item">
                    <Link href ="/">
                      <a className="footer-left-side-column-section-link">
                        Cambios y devoluciones
                      </a>
                    </Link>
                  </li>
                  <li className="footer-left-side-column-section-item">
                    <Link href ="/">
                      <a className="footer-left-side-column-section-link">
                        Preguntas frecuentes (FAQ)
                      </a>
                    </Link>
                  </li>
                  <li className="footer-left-side-column-section-item">
                    <Link href ="/">
                      <a className="footer-left-side-column-section-link">
                        Política de cookies
                      </a>
                    </Link>
                  </li>
                  <li className="footer-left-side-column-section-item">
                    <Link href ="/">
                      <a className="footer-left-side-column-section-link">
                        Configuración de cookies
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-right-side">
            <div className="footer-contact">
              <h6>Contáctanos:</h6>
              <p>+34 685 413 123</p>
              <p>Lunes - Viernes</p>
              <p> 09:00 - 20:00</p>
            </div>
            <div className="social-icons">
              <Link href="/">
                <a className="social-icons-links">
                  <div className="image-container">
                    <Image src={facebookIcon} alt="Enlace facebook"  className="image"/>
                  </div>
                </a>
              </Link>
              <Link href="/">
                <a className="social-icons-links">
                  <Image src={instagramIcon} alt="Enlace imstagram" />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-legal">
          <div className="footer-legal-logo">
            <Image  className="footer-logo" src={Logo} alt="Logo"  width={50} height={20}/>
          </div>
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
    </div>
  )
}
  
export default Footer