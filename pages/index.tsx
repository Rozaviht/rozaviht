import Link from 'next/link'
import Image from 'next/image'

import Logo from '@img/Logo.svg'
import cbdIlustration from '@img/cbd-ilustration2.svg'
import cbdSectionBanner from '@img/cbd-banner-2.png'
import cbdSectionBanner2 from '@img/cbd-banner2-2.png'
import rozadaySectionBanner from '@img/rozanews-banner-2.png'
import rozanewsIlustration from '@img/rozanews-ilustration2.svg'
import rozavihtSectionBanner from '@img/rozaviht-section2.png'

const index = () => {
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
        <div className="section--cbd-text-wrapper">
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
          <button className="section--cbd-cta"><Link href="/aceite-cbd"><a>Compra el aceite</a></Link></button>
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
        <div className="image-container">
          <Image src={rozavihtSectionBanner} alt="" width={150} height={100} layout="responsive"/>
        </div>
        <div className="container--flex">
          <p>
          En Rozaviht buscamos proporcionarte productos que te cuiden, que te hagan sentir mejor y mas sano. A la vez, buscamos usar la manera mas eficiente de usar los recursos para cuidar el medioambiente.
          No solo nuestros productos físicos te cuidaran, sino que también lo haremos a través, de las redes sociales y con nuestros artículos, donde te brindaremos información valiosa para que te cuides tu mejor y el medio en el que vives. 
          A la hora de la verdad no hace falta que todos hagamos grandes cambios, basta con aportar cada uno su granito de arena.
          </p>
          <p>
          Y siempre recuerda TE CUIDAS, TE CUIDAMOS Y LO CUIDAMOS.
          </p>
        </div>
        <button className="cta-secdry cta-secdry--rozavihtsection"><Link href="/aceite-cbd" ><a>Conocenos más</a></Link></button>
      </div>
    </div>
  )
}

export default index;