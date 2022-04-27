import anime from 'animejs'
import { ReactElement, useEffect } from 'react'
import LogoNegative from '../public/img/logo-negative.svg'



export default function cbdInfo () {

  useEffect(() => {
    var textWrapper: HTMLHeadingElement = document.querySelector('.logo-tagline') as HTMLHeadingElement
    textWrapper.innerHTML = textWrapper?.textContent?.replace(/\S/g, "<span class='letter'>$&</span>")!

    window.addEventListener("load", () => {
      anime.timeline({})
      .add({
        targets: "#firstSvgLiquid",
        d: [
          {value: "M0,0S37.424,182.072,121.183,210.289,268.8,124.154,335.037,112.867s4.752,46.632,51.087,52.275,68.908-60.295,134.252-29.7S585.72,321.374,647.5,287.514,767.5,0,767.5,0Z"},
          {value: "M0,0S44.449,1846.395,143.931,2132.541s175.327-873.5,254-987.957,5.644,472.894,60.677,530.123,81.843-611.449,159.453-301.206,77.61,1885.551,150.986,1542.176S911.56,0,911.56,0Z"}
        ],
        translateY: [-600, 0],
          easing: "easeInQuad",
          opacity: 1,
          duration: 4000,
      })
      .add({
        targets: ".first-svg",
        opacity: 1,
      }, "-=5000")
      .add({
        targets: "#secondSvgLiquid",
        d: [
          {value: "M0,0S37.424,182.072,121.183,210.289,268.8,124.154,335.037,112.867s4.752,46.632,51.087,52.275,68.908-60.295,134.252-29.7S585.72,321.374,647.5,287.514,767.5,0,767.5,0Z"},
          {value: "M0,0S44.449,1846.395,143.931,2132.541s175.327-873.5,254-987.957,5.644,472.894,60.677,530.123,81.843-611.449,159.453-301.206,77.61,1885.551,150.986,1542.176S911.56,0,911.56,0Z"}
        ],
        translateY: [-700, 0],
          easing: "easeInQuad",
          opacity: 1,
          duration: 4000,
      })
      .add({
        targets: ".second-svg",
        opacity: 1,
      }, "-=4800")
      .add({
        targets: '.logo',
        scale: [14, 1],
        opacity: [0,1],
        easing: 'easeOutCirc',
        duration: 600
      }, '+=1000')
      .add({
        targets: '.logo-tagline .letter',
        translateY: [-10, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1400,
        delay: (el, i) => 30 * i
      })
      .add({
        targets: '.first-svg, .logo',
        opacity: 0,
        easing: 'easeOutExpo',
        complete: (anim) => {
          document.querySelector<HTMLDivElement>(".first-svg, .second-svg, .logo")!.style.display="none" 
        }
      }, '+=1000')
    })
  })

  return (
    <div className="wrapper-qr">
      <div className="liquid-wrapper">
        <div className="first-svg">
          <svg
          className='liquid-svg'
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="none"
            viewBox="0 0 768 1024"
          >
            <path id="firstSvgLiquid" fill="#ac5850" d="M0,0S37.424,182.072,121.183,210.289,268.8,124.154,335.037,112.867s4.752,46.632,51.087,52.275,68.908-60.295,134.252-29.7S585.72,321.374,647.5,287.514,767.5,0,767.5,0Z" />
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
            <path id="secondSvgLiquid" fill="#ac5850" d="M0,0S37.424,182.072,121.183,210.289,268.8,124.154,335.037,112.867s4.752,46.632,51.087,52.275,68.908-60.295,134.252-29.7S585.72,321.374,647.5,287.514,767.5,0,767.5,0Z" />
          </svg>
        </div>
      </div>
      <div className='logo'>
        <LogoNegative />
        <h3 className='logo-tagline'>Te cuidas, Te cuidamos y Lo cuidamos</h3>
      </div>
      <h1>Muchas gracias por tu compra!!</h1>
    </div>
  )
}

cbdInfo.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {page}
    </>
  )
}