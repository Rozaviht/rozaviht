import anime from 'animejs'
import { useEffect } from 'react'

export default () => {
  useEffect(() => {
    var textWrapper: HTMLHeadingElement = document.querySelector('.logo-tagline') as HTMLHeadingElement
    textWrapper.innerHTML = textWrapper?.textContent?.replace(/\S/g, "<span class='letter'>$&</span>")!

    window.addEventListener("load", () => {
      const qrCbdAnimation = anime.timeline({})
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
      }, "-=4000")
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
      }, "-=3800")
      .add({
        targets: ".second-svg",
        opacity: 1,
      }, "-=3800")
      .add({
        targets: '.logo',
        scale: [14, 1],
        opacity: [0,1],
        easing: 'easeOutCirc',
        duration: 600
      }, "+=500")
      .add({
        targets: '.logo-tagline .letter',
        translateY: [-10, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1400,
        delay: (el, i) => 30 * i
      }, '+=800')
      .add({
        targets: '.liquid-wrapper, .logo',
        duration: 1000,
        opacity: [1, 0],
        easing: 'easeOutExpo',
        complete: () => {
          document.querySelector<HTMLDivElement>(".logo")!.style.display="none" 
          document.querySelectorAll<HTMLDivElement>(".liquid-wrapper")!.forEach(element => {
            element.style.display="none"
          })
        }
      }, '+=1000')
      .add({
        targets: '#qrPageContent',
        opacity: [0, 1],
        duration: 800,
        scale: [0.2, 1],
        easing: 'easeOutExpo'
      }, '+=1000')
    })

  })

}