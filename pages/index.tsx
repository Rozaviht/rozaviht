import Link from 'next/link'
import Image from 'next/image'

import Logo from '@img/Logo.svg'
import oilIllustration from '@img/oil-ilustration.svg'
import oilSectionBanner from '@img/pexels-cottonbro-seccion-aceite.jpg'
import rozadaySectionBanner from '@img/Image-sectionrozaday.jpg'
import rozavihtSectionBanner from '@img/Image-sectionrozaviht.jpeg'

const index = () => {
  return (
    <div className="home-wrapper">
      <div className="home-banner">
        <video className="video-banner" autoPlay loop playsInline preload='metadata'>
          <source type='video/mp4' src="/rozaviht-banner-video.mp4" />
        </video>
      </div>
      <div className="home-info">
        <h3 className="font-Lora">Siempre a tu disposición</h3>
        <p className="font-Lora">Envios solo a Península</p>
      </div>
      <div className="section section--oil">
        <div className="section-banner">
          <div className="image-container">
            <Image src={oilSectionBanner} alt=""  width={150} height={100} layout="responsive"/>
          </div>
          <h1 className="section-banner-title">ACEITE DE CBD</h1>
        </div>
        <div className="container--flex">
          <p>
            Los principales beneficios del aceite de CBD son la anti inflamación y la relajación,
            con un par de gotas en la zona notaras los efectos casi inmediatos. Por otro lado,
            aunque en España su venta esta restringida para uso tópico,
            en otros lugares de la Unión Europea y en Estados Únidos esta permitido su uso alimenticio,
            donde comúnmente se usa de manera sublingual.
          </p>
          <div className="image-container">
            <Image src={oilIllustration} alt=""  width={270} height={340} layout="responsive"/>
          </div>
          <p>
            Esto se debe a que el aceite de CBD, ha 
            demostrado en diferentes estudios ayudar
            a reducir el estrés, a conciliar mejor el sueño,
            permitiendo una mejor recuperación,
            y manejar mejor la ansiedad.
          </p>
          <p>
            Además nuestro aceite no contiene THC,
            que es el componente psicoactivo
            procedente del cannabis,
            por lo que puedes estar tranquilo.
            El aceite de CBD no es adictivo.
          </p>
        </div>
        <button className="cta--secdry"><Link href="/aceite-cbd"><a>Ver el aceite</a></Link></button>
      </div>
      <div className="section section--rozaday">
        <div className="section-banner">
          <div className="image-container">
            <Image src={rozadaySectionBanner} alt=""  width={150} height={100} layout="responsive"/>
          </div>
          <h1 className="section-banner-title" >Rodazay</h1>
        </div>
        <div className="container--flex">
          <p>
            Los principales beneficios del aceite de CBD son la anti inflamación y la relajación,
            con un par de gotas en la zona notaras los efectos casi inmediatos. Por otro lado,
            aunque en España su venta esta restringida para uso tópico,
            en otros lugares de la Unión Europea y en Estados Únidos esta permitido su uso alimenticio,
            donde comúnmente se usa de manera sublingual.
          </p>
          <img className="news-ilustration" src={''} alt="" />
          <p>
            Esto se debe a que el aceite de CBD, ha 
            demostrado en diferentes estudios ayudar
            a reducir el estrés, a conciliar mejor el sueño,
            permitiendo una mejor recuperación,
            y manejar mejor la ansiedad.
            Además nuestro aceite no contiene THC,
            que es el componente psicoactivo
            procedente del cannabis,
            por lo que puedes estar tranquilo.
            El aceite de CBD no es adictivo.
          </p>
        </div>
        <button className="cta--secdry"><Link href="/aceite-cbd"><a>Ir a rozaday</a></Link></button>
      </div>
      <div className="section section--rozaviht">
        <div className="image-container">
          <Image src={Logo} alt="" width={340} height={270} layout="responsive"/>
        </div>
        <p>
          Los principales beneficios del aceite de CBD son la anti inflamación y la relajación,
          con un par de gotas en la zona notaras los efectos casi inmediatos. Por otro lado,
          aunque en España su venta esta restringida para uso tópico,
          en otros lugares de la Unión Europea y en Estados Únidos esta permitido su uso alimenticio,
          donde comúnmente se usa de manera sublingual.
        </p>
        <button className="cta--secdry"><Link href="/aceite-cbd"><a>Conocenos</a></Link></button>
        <div className="image-container">
          <Image src={rozavihtSectionBanner} alt="" width={150} height={100} layout='responsive'/>
        </div>
      </div>
    </div>
  )
}

export default index;