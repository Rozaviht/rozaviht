import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Logo from '@img/Logo.webp'
import instagramIcon from '@img/instagram-icon.svg'
import facebookIcon from '@img/facebook-icon.svg'

const Footer = () => {
  const [footerListDropped, setFooterListDropped] = useState(false)

  const dropFooterList = () => setFooterListDropped(!footerListDropped)

  return (
      <div className="footer">
        <div className="flexcolum flexcolum--separate">
          <h2>¡Únete a la comunidad!</h2>
          <div>
            <p>
              Mantente enterado de nuestras novedades, y tranquilo solo te escribiremos cuando publiquemos 
              nuevos artículos o saquemos un nuevo producto.
            </p>
            <strong>
              No haremos spam, no es ecológico.
            </strong>
            <p>
              Tus datos personales se usarán tal y como se describe en nuestra
              <Link href="/privacidad-seguridad">
                <a style={{textDecoration: "underline", marginLeft: "5px"}}>
                  Política de Privacidad
                </a>
              </Link>.
            </p>
          </div>
          <input type="mail" placeholder="Introduce aquí tu correo electrónico" className="input--negative"/>
          <button className="cta cta--negative">UNIRSE</button>
        </div>
        <div className="footer__downSide">
          <div className="dropMenu">
              <h4  className={footerListDropped ? "dropMenu__title dropped" : "dropMenu__title"} onClick={dropFooterList}> Atención al cliente</h4>
              <div className={footerListDropped ? "dropMenu__content dropped" : "dropMenu__content"}>
                <ul className="flexcolum flexcolum--separate">
                  <li>
                    <Link href ="/">
                      <a>
                        Cambios y devoluciones
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href ="/">
                      <a>
                        Preguntas frecuentes (FAQ)
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href ="/">
                      <a>
                        Política de cookies
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href ="/">
                      <a>
                        Configuración de cookies
                      </a>
                    </Link>
                  </li>
                </ul>
            </div>
          </div>
          <div className="flexrow flexrow--between">
            <div className="flexcolum flexcolum--separate">
              <p>Contáctanos y te responderemos con la mayor brevedad posible:</p>
              <p>info@rozaviht.com</p>
            </div>
            <div className="flexrow">
              <Link href="/">
                <a className="footer__mediaIcon">
                    <Image src={facebookIcon} alt="Enlace facebook"/>
                </a>
              </Link>
              <Link href="https://www.instagram.com/rozaviht">
                <a className="footer__mediaIcon">
                  <Image src={instagramIcon} alt="Enlace imstagram" />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flexcolum flexcolum--around">
          <div className="footer__logoImg">
            <Image src={Logo} alt="Logo"  width={392} height={100} layout="responsive"/>
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
  
export default Footer