import Link from 'next/link'
import useScrollBlock from '@hooks/useScrollBlock'
import useQROilAnimation from '@hooks/useQROilAnimation'
import { ReactElement } from 'react'
import LogoNegative from '../public/img/logo-negative.svg'



export default function CbdInfo () {

  const [blockScroll, allowScroll] = useScrollBlock()

   useQROilAnimation()

  return (
    <div style={{ 'backgroundColor': '#ac5850', 'display': 'flex' }}>
      <div className="liquid-wrapper">
        <div className="first-svg">
          <svg
          className='liquid-svg'
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="none"
            viewBox="0 0 768 1024"
          >
            <filter id='f4'>
              <feOffset result='offOut' in='SourceGraphic' dx={0} dy={20} />
              <feColorMatrix 
                result='martixOut'
                in='offOut'
                type='matrix'
                values='0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0'
              />
              <feGaussianBlur 
                result='blurOut'
                in='matrixOut'
                stdDeviation={30}
              />
              <feBlend in='SourceGraphic' in2={'blurOut'} mode='normal' />
            </filter>
            <path id="firstSvgLiquid" filter='url(#f4)' fill="#B3716B" d="M0,0S37.424,182.072,121.183,210.289,268.8,124.154,335.037,112.867s4.752,46.632,51.087,52.275,68.908-60.295,134.252-29.7S585.72,321.374,647.5,287.514,767.5,0,767.5,0Z" />
          </svg>
        </div>
      </div>
      <div className="liquid-wrapper">
        <div className="second-svg">
          <svg
          className='liquid-svg'
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="none"
            viewBox="0 0 768 1024"
          >
            <path id="secondSvgLiquid" filter='url(#f4)' fill="#ac5850" d="M0,0S37.424,182.072,121.183,210.289,268.8,124.154,335.037,112.867s4.752,46.632,51.087,52.275,68.908-60.295,134.252-29.7S585.72,321.374,647.5,287.514,767.5,0,767.5,0Z" />
          </svg>
        </div>
      </div>
      <div className='logo'>
        <LogoNegative />
        <h3 className='logo-tagline'>Te cuidas, Te cuidamos y Lo cuidamos</h3>
      </div>
      <div id='qrPageContent' className='flexcolum  flexcolum--separate' style={{ 'boxShadow': '6px 10px 15px 3px rgba(0,0,0,0.1)', 'margin': '1rem', 'marginRight': '1rem', 'backgroundColor': '#f2f3fa', 'borderRadius': '10px', 'opacity': '0' }} >
        <h1 style={{ 'color': '#ac5850' }}>Información adicional sobre nuestro Aceite de CBD</h1>
        <p>Nos alegra saber que has decidido adquirir uno de nuestros aceites de CBD. En esta página nos gustaría brindarte un poco más de información que no esta representada en el packaging/estuche del producto, para no malgastar tanta tinta; ya que dispones del medio digital, que no es contaminante.</p>
        <div className='qrPage-card-section'>
          <h2 style={{ 'color': '#ac5850' }}>Ingredientes</h2>
          <p>Lo primero y más básico son los ingredientes de nuestro producto, que consta de los siguientes:</p>
          <ul style={{ 'marginTop': '0.5rem' }} >
            <li>
              <strong>- Aceite de Semilla de Cannabis Sativa:</strong>
              <p>El aceite de semilla de cannabis sativa más conocido como Aceite de Cañamo, cumple la función de aceite transportador en el producto. Esto se debe a sus propiedades nutritivas y a su aroma relativamente ligero, en nuestro caso el aceite procede de la semilla de la planta. </p>
              <br />
            </li>
            <li>
              <strong>- Cannabidiol:</strong>
              <p>El cannabidiol o CBD, es el compuesto principal de nuestro aceite. Este al igual que el aceite de cañamo procede de la planta Cannabis Sativa, y tiene varios beneficios para nuestro cuerpo destacando la disminución del estrés y la antiinflamación.</p>
              <br />
            </li>
            <li>
              <strong>- Acetato de tocoferilo:</strong>
              <p>El acetato de tocoferilo es un derivado de la vitamnina E, y su principal beneficio es ser antioxidante, propio de la vitamina E. En nuestro caso el acetato es de procedencia vegetal.</p>
            </li>
          </ul>
        </div>
        <div className='qrPage-card-section'>
          <h2 style={{ 'color': '#ac5850' }}>Modo de empleo</h2>
          <p>El aceite de CBD se puede usar de manera tópica, aplicando un par de gotas en la zona deseada, y masajeando hasta que se haya completamente absorbido; y notando los efectos casi de inmediato. La otra forma de aplicar el aceite de CBD es de manera sublingual, de igual manera aplicando un par de gotas debajo de la lengua en el paladar. Lo recomendable es empezar aplicando unas pocas gotas e ir aumentado si se considera necesario.</p>
          <br />
          <p>En España su venta solo esta destinada a uso tópico, en la piel, por lo que en Rozaviht aconsejamos que nuestro producto sea utilizado para ese fin. Además reomendamos agitar un poco siempre antes de usar.</p>
        </div>
        <div className='qrPage-card-section'>
          <h2 style={{ 'color': '#ac5850' }}>Precauciones</h2>
          <p>Al ser totalmente natural nuestro aceite de CBD, se recomienda conservarlo a una temperatura ambiente entre 15ºC y 25ºC grados, ya que podría estropearse el producto de lo contrario; sobre todo si se expone a temperaturas muy elevadas. Por eso mismo evitar dejarlo expuesto al solo por mucho tiempo.</p>
        </div>
        <p style={{ 'marginTop': '1rem' }} >Bueno eso sería la información principal de esta página, esperamos que te sirva para entender un poco más el producto que has comprado. También te recomendamos explorar nuestra página de Rozanews donde iremos subiendo pequeños árticulos rapidos de leer, para irte informando de temas relacionados con nuestra marca.</p>
        <h3 style={{ 'color': '#ac5850', 'marginTop': '1rem' }}>Y una vez más, te agradecemos por confiar en nuestro producto. Que lo disfrutes!!</h3>
        <Link href="/rozanews">
          <button className='cta cta--oilColor'><a className='link-negative'>Ir a ROZANEWS</a></button>
        </Link>
      </div>
    </div>
  )
}

CbdInfo.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {page}
    </>
  )
}