import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'

import type { ReactElement } from 'react'

import Layout from '@components/Layout'


import Isotipo from '@img/Isotipo.svg'
import RozanewsIlustration from '@img/rozanews-ilustration.svg'
import CbdIlustrationNegative from '@img/cbd-ilustration-negative.svg'



export default function index () {
  
  useEffect(() => {
    let observerOptions = {
      root: null,
      threshold: 0.3,
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("anmtionON")
        }
      })
  
    }, observerOptions)

    let allAnimatedObjects = document.querySelectorAll(
      ".section--cbd-title, .section-tagline")

    allAnimatedObjects.forEach(object => {
      observer.observe(object)
    })

  }, [])



  return (
    <div className="landingPage">
      <div style={{ 'marginBottom': '4rem' }}>
        <video className="landingPage__banner" autoPlay loop playsInline preload='metadata' muted>
          <source type='video/mp4' src="/web-banner.mp4" />
        </video>
      </div>
      {/* ---------- CBD SECTION --------- */}
      <div className="cbdSection">
        <div className="cbdSection__hero">
          <h1 className="cbdSection__title">ACEITE DE CBD</h1>
          <div className="cbdSection__frstimg">
            <Image src={'/img/cbd-section-img-horizontally.webp'} alt="" height={1076} width={1500} layout="responsive"/>
          </div>
          <div className="cbdSection__scndimg">
            <Image src={'/img/cbd-section-img-vertically.webp'} alt="" height={1600} width={1200} layout="responsive"/>
          </div>
        </div>
        <div className="flexcolum flexcolum--separate">
          <p style={{color: "#f2f3fa"}}>
            Los principales beneficios del aceite de CBD son la anti inflamación y la relajación,
            con un par de gotas en la zona notaras los efectos casi inmediatos. Además, se ha demostrado en diferentes
            estudios que ayuda a reducir el estrés, a conciliar mejor el sueño; permitiendo una mejor recuperación, y 
            ayudar a manejar mejor la ansiedad.
          </p>
          <p style={{color: "#f2f3fa"}}>
            Y tranquilo que nuestro aceite contiene 0% de THC.
          </p>
        </div>
          <div className="flexrow flexrow--between" style={{width: "100%"}}>
            <button className="cbdSection__cta">
              <Link href="/aceite-cbd"><a className="cbdSection__link">Ver el aceite</a></Link>
            </button>
            <div className="cbdSection__illustration">
            <CbdIlustrationNegative />
          </div>
          </div>
      </div>
      {/* ---------- ROZANEWS SECTION --------- */}
      <div className="flexcolum flexcolum--around flexcolum--separate2" style={{ 'position': 'relative', 'marginTop': '2rem' }} >
        <h1 className="section-title">ROZANEWS</h1>
        <div className="typewriter">
          <h3 className="section-tagline">"Informate de lo que te importa"</h3>
        </div>
        <div className="rozanews-section-img">
          <Image src={'/img/rozanews-section-banner.webp'} alt={'Hombre escribiendo en un cuaderno el eslogan de Rozaviht con un cafe'}  width={1024} height={682} layout="responsive"/>
        </div>
          <p > 
          Rozanews es nuestra sección donde publicamos artículos relacionados con el cuidado personal y el cuidado medioambiental.
          Queremos mantenerte informado sobre estos temas que tanto nos importan, priorizando la rigurosidad, pero contándotelo de una manera amena.
          </p>
        <div className="home-cta">
          <div className="rozanewsIlustration-container">
            <RozanewsIlustration />
          </div>
          <div className="link-wrapper">
            <button className="section-cta section-cta--rozanewssection"><Link href="/aceite-cbd"><a>Ir a Rozanews</a></Link></button>
          </div>
        </div>
      </div>
      {/* ---------- ROZAVIHT SECTION --------- */}
      <div className="rozaviht-section" >
        <Isotipo alt="" className="rozaviht-section__img" />
        <h1>NUESTRO LEMA</h1>
        <ul className='rozaviht-section__list' >
          <li>
            <h2 >Te cuidas</h2>
            <p>
              Aunque nuestra misión en Rozaviht es buscar lo mejor para tu cuidado personal, nada funcionará si no eres tu el que realmente se preocupa de su salud. Por ello debes ser tú el que tome la desición de buscar lo mejor para tí y cuidar de tí.
            </p>
          </li>
          <li>
            <h2 >Te cuidamos</h2>
            <p>
              Por supuesto nuestra misión será siempre buscar los mejores productos para tu cuidado personal, y no solo lo haremos a través de productos físicos. También usaremos la vía digital para proporcinarte información que te sirva de ayuda para que te cuides de mejor manera.
            </p>
          </li>
          <li>
            <h2>Y Lo cuidamos</h2>
            <p>
              Además, y no menos importante, nos preocuremos siempre del cuidado medioambiental. Al final de nada vale el esfuerzo si no tenemos un medio adecuado en el que vivir. Así que buscaremos siempre minimizar la contaminación que generemos, y nos apoyaremos por ello de la vía digital para diferentes temas, ya que no contamina.
            </p>
          </li>
        </ul>
        <button className="cta cta--maincolor">
          <Link href="/quienes-somos" >
            <a style={{ 'color': '#f2f3fa' }} >
              Conocenos mejor
            </a>
          </Link>
        </button>
      </div>
    </div>
  )
}


index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}