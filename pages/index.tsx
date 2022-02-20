import Link from 'next/link'
import Image from 'next/image'

import Logo from '@img/Logo.svg'
import cbdIlustration from '@img/cbd-ilustration.svg'
import oilSectionBanner from '@img/cbd-banner.png'
import rozadaySectionBanner from '@img/rozanews-banner.png'
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
      <div className="home-info">
        <h3 className="font-Lora">Siempre a tu disposición</h3>
        <p className="font-Lora">Envios solo a Península</p>
      </div>
      <div className="section section--oil">
          <div className="image-container">
            <Image src={oilSectionBanner} alt=""  width={150} height={100} layout="responsive"/>
          </div>
        <div className="container--flex ">
          <p className="text-white">
            Los principales beneficios del aceite de CBD son la anti inflamación y la relajación,
            con un par de gotas en la zona notaras los efectos casi inmediatos. Por otro lado,
            aunque en España su venta esta restringida para uso tópico,
            en otros lugares de la Unión Europea y en Estados Únidos esta permitido su uso alimenticio,
            donde comúnmente se usa de manera sublingual.
          </p>
          <div className="oilIllustration-container">
            <Image src={cbdIlustration} alt=""  width={270} height={340} layout="responsive"/>
          </div>
          <p className="text-white">
            Esto se debe a que el aceite de CBD, ha 
            demostrado en diferentes estudios ayudar
            a reducir el estrés, a conciliar mejor el sueño,
            permitiendo una mejor recuperación,
            y manejar mejor la ansiedad.
          </p>
          <p className="text-white">
            Además nuestro aceite no contiene THC,
            que es el componente psicoactivo
            procedente del cannabis,
            por lo que puedes estar tranquilo.
            El aceite de CBD no es adictivo.
          </p>
        </div>
        <button className="cta-secdry cta-secdry--cbdsection"><Link href="/aceite-cbd"><a>Ver el aceite</a></Link></button>
      </div>
      <div className="section section--rozaday">
          <div className="image-container">
            <Image src={rozadaySectionBanner} alt=""  width={150} height={100} layout="responsive"/>
          </div>
        <div className="container--flex">
          <p>
          Rozaday es nuestra sección donde publicamos artículos relacionados con el cuidado personal y el cuidado medioambiental.
          Queremos mantenerte informado sobre estos temas que tanto nos importan, priorizando la rigurosidad, pero contándotelo de una manera amena, y que cualquiera pueda leerlo.
          </p>
          <p>
          Nuestro artículos tienen una duración de lectura de unos 10 minutos, tras estudiarlo, nos dimos cuenta que este tiempo es el necesario para poder entrar en cierto detalle y no darte una idea vaga sobre algún tema, que tras leer el artículo, realmente hayas aprendido algo nuevo. Mas de este tiempo creemos que sería muy pesado y con menos no podríamos explicar bien las cosas.
          </p>
          <div className="rozanewsIlustration-container">
            <Image src={rozanewsIlustration} alt=""  width={100} height={140} layout="responsive"/>
          </div>
          <p>
          Subiremos inicialmente dos artículos cada semana, para que podamos investigar bien sobre los temas escribir, y el día que los subiremos será el domingo, para que puedas en tan solo 20 minutos relajados, aprender algo nuevo.
          </p>
        </div>
        <button className="cta-secdry cta-secdry--rozanewssection"><Link href="/aceite-cbd"><a>Ir a rozanews</a></Link></button>
      </div>
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
        <button className="cta-secdry cta-secdry--rozavihtsection"><Link href="/aceite-cbd"><a>Conocenos</a></Link></button>
     {/*    <div className="image-container">
          <Image src={rozavihtSectionBanner} alt="" width={150} height={100} layout='responsive'/>
        </div> */}
      </div>
    </div>
  )
}

export default index;