import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'

import type { ReactElement } from 'react'

import Layout from '@components/Layout'

import Logo from '@img/logo.svg'
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

  useEffect(() => {
    var windowWidth = window.matchMedia(' (max-width: 640px) ')
    var landingVideo = document.getElementById('landingVideo')
    var videoSource = document.createElement('source')
    videoSource.id = 'videoSourceID'
    videoSource.setAttribute('type', 'video/mp4')
    landingVideo?.appendChild(videoSource)

    if (windowWidth.matches) {
      landingVideo?.pause()
      videoSource.removeAttribute('src')
      videoSource.setAttribute('src', '/web-banner.mp4')
      landingVideo?.load()
      landingVideo?.play()
    } else {
      landingVideo?.pause()
      videoSource.removeAttribute('src')
      videoSource.setAttribute('src', '/landing-video-horizontally.mp4')
      landingVideo?.load()
      landingVideo?.play()
    }

    window.addEventListener('resize', () => {
      var windowWidth = window.matchMedia(' (max-width: 640px) ')
      var landingVideo = document.getElementById('landingVideo')
      var videoSource = document.createElement('videoSourceID')
      videoSource.setAttribute('type', 'video/mp4')
      landingVideo?.appendChild(videoSource)
  
      if (windowWidth.matches) {
        landingVideo?.pause()
        videoSource.removeAttribute('src')
        videoSource.setAttribute('src', '/web-banner.mp4')
        landingVideo?.load()
        landingVideo?.play()
      } else {
        landingVideo?.pause()
        videoSource.removeAttribute('src')
        videoSource.setAttribute('src', '/landing-video-horizontally.mp4')
        landingVideo?.load()
        landingVideo?.play()
      }
    })
  })


  return (
    <div className="landingPage">
      <div style={{ 'marginBottom': '4rem' }}>
        <video id='landingVideo' className="landingPage__banner" autoPlay loop playsInline preload='metadata' muted>
        </video>
      </div>
      {/* ---------- CBD SECTION --------- */}
      <div className="cbdSection">
        <div className="cbdSection__img">
          <div className='cbdSection__img-back'></div>
          <Image src='/img/cbd-section-img-vertically.webp' alt="" height={1600} width={1200} layout="responsive"/>
        </div>
        <div className="cbdSection__content">
          <div className="flexcolum flexcolum--separate">
            <h1>ACEITE DE CBD</h1>
            <p>
              Los principales beneficios del aceite de CBD son la anti inflamación y la relajación,
              con un par de gotas en la zona notaras los efectos casi inmediatos. Además, se ha demostrado en diferentes
              estudios que ayuda a reducir el estrés, a conciliar mejor el sueño; permitiendo una mejor recuperación, y 
              ayudar a manejar mejor la ansiedad.
            </p>
            <p>
              Y tranquilo que nuestro aceite contiene 0% de THC.
            </p>
          </div>
          <CbdIlustrationNegative className="cbdSection__illustration" />
          <button className="cbdSection__cta">
            <Link href="/aceite-cbd"><a className="cbdSection__link">Ver el aceite</a></Link>
          </button>
        </div>
      </div>
      {/* ---------- ROZANEWS SECTION --------- */}
      <div className="rozanewsSection" >
        <div className="rozanewsSection__img">
          <Image src={'/img/rozanews-section-banner.webp'} alt={'Hombre escribiendo en un cuaderno el eslogan de Rozaviht con un cafe'}  width={1024} height={682} layout="responsive"/>
        </div>
        <div className="rozanewsSection__content">
          <div className="rozanewsSection__title">
            <h1>ROZANEWS</h1>
            <div className="typewriter">
              <h3 className="section-tagline">"Informate de lo que te importa"</h3>
            </div>
          </div>
          <p > 
          Rozanews es nuestra sección donde publicamos artículos relacionados con el cuidado personal y el cuidado medioambiental.
          Queremos mantenerte informado sobre estos temas que tanto nos importan, priorizando la rigurosidad, pero contándotelo de una manera amena.
          </p>
          <RozanewsIlustration className="rozanewsSection__illustration"/>
          <button className="rozanewsSection__cta"><Link href="/aceite-cbd"><a>Ir a Rozanews</a></Link></button>
        </div>
      </div>
      {/* ---------- ROZAVIHT SECTION --------- */}
      <div className="rozavihtSection" >
        <Logo alt="" className="rozavihtSection__img" />
        <h1>NUESTRO LEMA</h1>
        <ul className='rozavihtSection__list' >
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