import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'

import Logo from '@img/Logo.svg'
import cbdIlustration from '@img/cbd-ilustration2.svg'
import cbdSectionBanner from '@img/cbd-banner-2.png'
/* import cbdSectionBanner2 from '@img/img-cbd-page.png' */
import cbdSectionBanner2 from '@img/cbd-banner2-2.png'
import rozadaySectionBanner from '@img/rozanews-banner-2.png'
import rozanewsIlustration from '@img/rozanews-ilustration2.svg'
import photoCollageOne from '@img/foto1collage.png'
import photoCollageTwo from '@img/foto2collage.png'
import photoCollageThree from '@img/foto3collage.png'
import photoCollageFour from '@img/foto4collage.png'
import photoCollageFive from '@img/foto5collage.png'

const index = () => {

  
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
        <video className="video-banner" autoPlay loop playsInline preload='metadata'>
          <source type='video/mp4' src="/rozaviht-banner-video.mp4" />
        </video>
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
            <Image src={cbdIlustration} alt=""  width={270} height={340} layout="responsive"/>
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
          Rozaday es nuestra sección donde publicamos artículos relacionados con el cuidado personal y el cuidado medioambiental.
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
        <div className="section--rozaviht-banner">
          <Image src={Logo} width={200} height={100} layout="responsive" />
        </div> 
        <div className="section-text-wrapper">
          <p className="section--rozaviht-text">
          En Rozaviht buscamos proporcionarte productos que te cuiden, que te hagan sentir mejor y más sano, buscando usar de la manera más eficiente los recursos para cuidar el medioambiente.
          </p>
          <p className="section--rozaviht-text">
          No solo nuestros productos físicos te cuidaran, sino que también lo haremos a través, de las redes sociales y con nuestros artículos, donde te brindaremos información valiosa para que te cuides tu mejor y el medio en el que vives. 
          </p>
          <p className="section--rozaviht-text">
          A la hora de la verdad no hace falta que todos hagamos grandes cambios, basta con aportar cada uno su granito de arena.
          </p>
        </div>
        <div className="collage-wrapper">
          <div className="collageMain">
            <Image src={photoCollageOne} alt="" width={100} height={150} layout="responsive" />
          </div>
          <div className="collageScendry">
            <Image src={photoCollageTwo} alt="" width={150} height={100} layout="responsive" />
          </div>
          <div className="collageScendry">
            <Image src={photoCollageThree} alt="" width={150} height={100} layout="responsive" />
          </div>
          <div className="collageScendry">
            <Image src={photoCollageFour} alt="" width={150} height={100} layout="responsive" />
          </div>
          <div className="collageScendry">
            <Image src={photoCollageFive} alt="" width={100} height={150} layout="responsive" />
          </div>
        </div>
        {/* <button className="cta-secdry cta-secdry--rozavihtsection"><Link href="/aceite-cbd" ><a>Conocenos más</a></Link></button> */}
      </div>
    </div>
  )
}

export default index;