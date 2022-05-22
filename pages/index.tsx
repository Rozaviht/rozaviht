import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'

import type { ReactElement } from 'react'

import Layout from '@components/Layout'

import Logo from '../public/img/logo.svg'
import RozanewsIlustration from '../public/img/rozanews-ilustration.svg'
import CbdIlustrationNegative from '../public/img/cbd-ilustration-negative.svg'



export default function LandingPage () {
  
  useEffect(() => {
    let observerOptions = {
      root: null,
      threshold: 0.3,
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aniON")
        }
      })
  
    }, observerOptions)

    let allAnimatedObjects = document.querySelectorAll(
      " .section-tagline")

    allAnimatedObjects.forEach(object => {
      observer.observe(object)
    })

  }, [])

  useEffect(() => {
    var windowWidth640 = window.matchMedia(' (max-width: 640px) ')
    var windowWidth960 = window.matchMedia(' (max-width: 960px) ')
    var landingVideo = document.getElementById('landingVideo') as HTMLVideoElement
    var source = document.createElement('source')
    source.id = 'videoSourceID'
    source.setAttribute('type', 'video/mp4')
    landingVideo?.appendChild(source)

    if (windowWidth640.matches) {
      landingVideo?.pause()
      source.removeAttribute('src')
      source.setAttribute('src', 'https://rozaviht-media.s3.eu-west-3.amazonaws.com/landing-video-5-4.mp4')
      landingVideo?.load()
      landingVideo?.play()
    } else if (windowWidth960.matches) {
      landingVideo?.pause()
      source.removeAttribute('src')
      source.setAttribute('src', 'https://rozaviht-media.s3.eu-west-3.amazonaws.com/landing-video-16-9.mp4')
      landingVideo?.load()
      landingVideo?.play()
    } else {
      landingVideo?.pause()
      source.removeAttribute('src')
      source.setAttribute('src', 'https://rozaviht-media.s3.eu-west-3.amazonaws.com/landing-video-3-1.mp4')
      landingVideo?.load()
      landingVideo?.play()

    }

    window.addEventListener('resize', () => {
      var windowWidth640 = window.matchMedia(' (max-width: 640px) ')
      var windowWidth960 = window.matchMedia(' (max-width: 960px) ')
      var landingVideo = document.getElementById('landingVideo') as HTMLVideoElement
      var source = document.getElementById('videoSourceID')!
  
      if (windowWidth640.matches) {
        landingVideo?.pause()
        source.removeAttribute('src')
        source.setAttribute('src', 'https://rozaviht-media.s3.eu-west-3.amazonaws.com/landing-video-5-4.mp4')
        landingVideo?.load()
        landingVideo?.play()
      } else if (windowWidth960.matches) {
        landingVideo?.pause()
        source.removeAttribute('src')
        source.setAttribute('src', 'https://rozaviht-media.s3.eu-west-3.amazonaws.com/landing-video-16-9.mp4')
        landingVideo?.load()
        landingVideo?.play()
      } else {
        landingVideo?.pause()
        source.removeAttribute('src')
        source.setAttribute('src', 'https://rozaviht-media.s3.eu-west-3.amazonaws.com/landing-video-3-1.mp4')
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
        <div className="cbdSection__img-wrapper">
          <div className="cbdSection__img">
            <Image className="cbdSection__img-content" src='https://rozaviht-media.s3.eu-west-3.amazonaws.com/img/cbd-section.png' alt="" height={1499} width={1499} layout="responsive"/>
          </div>
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
          <div className="flexrow flexrow--between">
            <button className="cbdSection__cta">
              <Link href="/aceite-cbd"><a className="cbdSection__link">Ver el aceite</a></Link>
            </button>
            <CbdIlustrationNegative className="cbdSection__illustration" />
          </div>
        </div>
      </div>
      {/* ---------- ROZANEWS SECTION --------- */}
      <div className="rozanewsSection" >
        <div className="rozanewsSection__img">
          <Image src={'https://rozaviht-media.s3.eu-west-3.amazonaws.com/img/rozanews-section-banner.webp'} alt={'Hombre escribiendo en un cuaderno el eslogan de Rozaviht con un cafe'}  width={1024} height={682} layout="responsive"/>
        </div>
        <div className="flexcolum flexcolum--around flexcolum--nopd" style={{ 'width': '100%' }}>
          <div className="rozanewsSection__content">
            <div className="rozanewsSection__title">
              <h1>ROZANEWS</h1>
              <div className="typewriter">
                <h3 className="section-tagline">&quotInformate de lo que te importa&quot</h3>
              </div>
            </div>
            <p > 
            Rozanews es nuestra sección donde publicamos artículos relacionados con el cuidado personal y el cuidado medioambiental.
            Queremos mantenerte informado sobre estos temas que tanto nos importan, priorizando la rigurosidad, pero contándotelo de una manera amena.
            </p>
            <RozanewsIlustration className="rozanewsSection__illustration"/>
            <button className="rozanewsSection__cta"><Link href="/rozanews"><a>Ir a Rozanews</a></Link></button>
          </div>
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


LandingPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}