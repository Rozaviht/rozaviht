import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'

import type { ReactElement } from 'react'

import Layout from '@components/Layout'


import IsotipoNegative from '@img/isotipo-negative.svg'
import cbdSectionBanner from '@img/cbd-banner-2.png'
import cbdSectionImg2 from '@img/cbd-banner2-2.png'
import rozanewsSectionBanner from '@img/rozanews-section-banner.webp'
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
      <div className="home-banner">
        <video className="landingPage__banner" autoPlay loop playsInline preload='metadata' muted>
          <source type='video/mp4' src="/web-banner.mp4" />
        </video>
        <div className="flexcolum flexcolum--around">
          <p>"Cuidate, y cuida el medio en el que vives."</p>
          <p>@rozaviht</p>
        </div>
      </div>
      {/* ---------- CBD SECTION --------- */}
      <div className="cbdSection">
        <div className="cbdSection__hero">
          <h1 className="cbdSection__title">ACEITE DE CBD</h1>
          <div className="cbdSection__frstimg">
            <Image src={cbdSectionBanner} alt="" layout="responsive"/>
          </div>
          <div className="cbdSection__scndimg">
            <Image src={cbdSectionImg2} alt="" layout="responsive"/>
          </div>
        </div>
        <div className="flexcolum flexcolum--separate">
          <p style={{color: "#f2f3fa"}}>
            Los principales beneficios del aceite de CBD son la anti inflamación y la relajación,
            con un par de gotas en la zona notaras los efectos casi inmediatos. Además, ha demostrado en diferentes
            estudios ayudar a reducir el estrés, a conciliar mejor el sueño, permitiendo una mejor recuperación, y 
            ayuda a manejar mejor la ansiedad.
          </p>
          <p style={{color: "#f2f3fa"}}>
            Y tranquilo que nuestro aceite contiene 0% de THC.
          </p>
        </div>
          <div className="flexrow flexrow--between" style={{width: "100%"}}>
            <button className="cbdSection__cta">
              <Link href="/aceite-cbd"><a className="cbdSection__link">Ver el aceite</a></Link>
              <svg className="liquidParticle" xmlns="http://www.w3.org/2000/svg"></svg>
              <svg className="liquidParticle" xmlns="http://www.w3.org/2000/svg"></svg>
              <svg className="liquidParticle" xmlns="http://www.w3.org/2000/svg"></svg>
              <svg className="liquidParticle" xmlns="http://www.w3.org/2000/svg"></svg>
              <svg className="liquidParticle" xmlns="http://www.w3.org/2000/svg"></svg>
            </button>
            <div className="cbdSection__illustration">
            <CbdIlustrationNegative />
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
          <Image src={rozanewsSectionBanner} alt=""  width={150} height={100} layout="responsive"/>
        </div>
        <div className="section-text-container">
          <p className="rozanews-text">
          Rozanews es nuestra sección donde publicamos artículos relacionados con el cuidado personal y el cuidado medioambiental.
          Queremos mantenerte informado sobre estos temas que tanto nos importan, priorizando la rigurosidad, pero contándotelo de una manera amena, y que cualquiera pueda leerlo.
          </p>
        </div>
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
      <div className="section section--rozaviht">
        <div className="section--rozaviht-img">
          <Image src={IsotipoNegative} width={114} height={100} layout="responsive" />
        </div> 
        <div className="section-text-wrapper">
          <h2>Nuestro Lema</h2>
          <h3 className="section--rozaviht-subtitle">Te cuidas</h3>
          <p className="section--rozaviht-text">
          En Rozaviht buscamos proporcionarte productos que te cuiden, que te hagan sentir mejor y más sano, buscando usar de la manera más eficiente los recursos para cuidar el medioambiente.
          </p>
          <h3 className="section--rozaviht-subtitle">Te cuidamos</h3>
          <p className="section--rozaviht-text">
          No solo nuestros productos físicos te cuidaran, sino que también lo haremos a través, de las redes sociales y con nuestros artículos, donde te brindaremos información valiosa para que te cuides tu mejor y el medio en el que vives. 
          </p>
          <h3 className="section--rozaviht-subtitle">Y Lo cuidamos</h3>
          <p className="section--rozaviht-text">
          A la hora de la verdad no hace falta que todos hagamos grandes cambios, basta con aportar cada uno su grano de arena.
          </p>
        </div>

        <button className="cta-secdry cta-secdry--rozavihtsection">
          <Link href="/aceite-cbd" >
            <a>
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