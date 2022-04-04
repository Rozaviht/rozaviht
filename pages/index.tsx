import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'

import type { ReactElement } from 'react'

import Layout from '@components/Layout'

import IsotipoNegative from '@img/isotipo-negative.svg'
import cbdIlustrationNegative from '@img/cbd-ilustration-negative.svg'
import cbdSectionBanner from '@img/cbd-banner-2.png'
import cbdSectionBanner2 from '@img/cbd-banner2-2.png'
import rozadaySectionBanner from '@img/rozanews-banner-2.png'
import rozanewsIlustration from '@img/rozanews-ilustration2.svg'





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
      ".animated-slide, .section--cbd-text, .section--cbd-title, .section-tagline, .section--cbd-cta, .section--cbd-cta-link")

    allAnimatedObjects.forEach(object => {
      observer.observe(object)
    })

  }, [])



  return (
    <div className="home-wrapper">
      <div className="home-banner">
        <video className="video-banner" autoPlay loop playsInline preload='metadata' muted>
          <source type='video/mp4' src="/web-banner_2.mp4" />
        </video>
        <div className="home-phrase-wrapper">
          <p>"Cuidate, y cuida el medio en el que vives."</p>
          <p>@rozaviht</p>
        </div>
      </div>
      {/* ---------- CBD SECTION --------- */}
      <div className="section section--cbd">
        {/* <div className="background-slide"></div> */}
        <div className="section--cbd-hero">
          <h1 className="section--cbd-title">ACEITE DE CBD</h1>
          <div className="section--cbd-img">
            <div className="animated-slide animated-slide--big"></div>
            <Image src={cbdSectionBanner} alt=""  width={150} height={100} layout="responsive"/>
          </div>
          <div className="section--cbd-secndimg">
            <div className="animated-slide animated-slide--small"></div>
            <Image src={cbdSectionBanner2} alt=""  width={100} height={150} layout="responsive"/>
          </div>
        </div>
        <div className="section-text-wrapper">
          <p className="section--cbd-text">
            Los principales beneficios del aceite de CBD son la anti inflamación y la relajación,
            con un par de gotas en la zona notaras los efectos casi inmediatos. Además, ha demostrado en diferentes
            estudios ayudar a reducir el estrés, a conciliar mejor el sueño, permitiendo una mejor recuperación, y 
            ayuda a manejar mejor la ansiedad.
          </p>
          <p className="section--cbd-text">
            Y tranquilo que nuestro aceite contiene 0% de THC.
          </p>
        </div>
        <div className="section--cbd-cta-wrapper">
          <button className="section--cbd-cta"><Link href="/aceite-cbd"><a className="section--cbd-cta-link">Compra el aceite</a></Link></button>
          <div className="cbdIllustration">
            <Image src={cbdIlustrationNegative} alt=""  width={270} height={340} layout="responsive"/>
          </div>
        </div>
      </div>
      {/* ---------- ROZANEWS SECTION --------- */}
      <div className="section section--rozanews">
        <h1 className="section-title">ROZANEWS</h1>
        <div className="typewriter">
          <h3 className="section-tagline">"Informate de lo que te importa"</h3>
        </div>
        <div className="section--rozanews-img">
          <Image src={rozadaySectionBanner} alt=""  width={150} height={100} layout="responsive"/>
        </div>
        <div className="section-text-container">
          <p className="rozanews-text">
          Rozanews es nuestra sección donde publicamos artículos relacionados con el cuidado personal y el cuidado medioambiental.
          Queremos mantenerte informado sobre estos temas que tanto nos importan, priorizando la rigurosidad, pero contándotelo de una manera amena, y que cualquiera pueda leerlo.
          </p>
        </div>
        <div className="home-cta">
          <div className="rozanewsIlustration-container">
            <Image src={rozanewsIlustration} alt=""  width={100} height={140} layout="responsive"/>
          </div>
          <div className="link-wrapper">
            <button className="section-cta section-cta--rozanewssection"><Link href="/aceite-cbd"><a>Ir a Rozanews</a></Link></button>
          </div>
        </div>
      </div>
      {/* ---------- ROZAVIHT SECTION --------- */}
      <div className="section section--rozaviht">
        <div className="section--rozaviht-img">
          <Image src={IsotipoNegative} width={114} height={100} layout="responsive" />
        </div> 
        <div className="section-text-wrapper">
          <h2 className="section--rozaviht-subtitle">Te cuidas</h2>
          <p className="section--rozaviht-text">
          En Rozaviht buscamos proporcionarte productos que te cuiden, que te hagan sentir mejor y más sano, buscando usar de la manera más eficiente los recursos para cuidar el medioambiente.
          </p>
          <h2 className="section--rozaviht-subtitle">Te cuidamos</h2>
          <p className="section--rozaviht-text">
          No solo nuestros productos físicos te cuidaran, sino que también lo haremos a través, de las redes sociales y con nuestros artículos, donde te brindaremos información valiosa para que te cuides tu mejor y el medio en el que vives. 
          </p>
          <h2 className="section--rozaviht-subtitle">Y Lo cuidamos</h2>
          <p className="section--rozaviht-text">
          A la hora de la verdad no hace falta que todos hagamos grandes cambios, basta con aportar cada uno su grano de arena.
          </p>
        </div>

        <button className="cta-secdry cta-secdry--rozavihtsection">
          <Link href="/aceite-cbd" >
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101.26 59.27" className="leaf-container">
                <path className="leaf"
                  d="M99.71.2C94.5,4.13,83.56,10.08,60.86,8.87,34.58,7.47,22.11,17.55,19.75,19.7,18.05,21.23,7.81,33,14.07,44.26A45.6,45.6,0,0,1,1.43,43s-2.4,2.84-1,4.26c.78.78,8.41.06,15.13-.75,2.85,3.69,7.69,7.26,15.43,10.3C63.75,69.72,90.42,27.4,94.29,21.45A40.78,40.78,0,0,0,99.58,9.34l1.66-8.17A1,1,0,0,0,99.71.2Z" />
              </svg>
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