import anime from "animejs"
import { useEffect } from "react"

type recyclingAnimationProps = {
  infoList: boolean[]
}

export default ({infoList}:recyclingAnimationProps) => {

  useEffect(() => {
    const recyclingAnimation = anime.timeline({autoplay: false, loop: false})

    recyclingAnimation.add({
      targets: '.recycling-img--0',
      opacity: [0,1],
      duration: 1500,
      easing: 'easeOutCirc',
    })
    .add({
      targets: '.recycling-img--0',
      opacity: [1,0],
      duration: 1500,
      easing: 'easeOutCirc',
    })
    .add({
      targets: '.recycling-img--1',
      opacity: [0,1],
      duration: 1500,
      easing: 'easeOutCirc',
    }, '+=800')
    .add({
      targets: '.recycling-img--1',
      opacity: [1,0],
      duration: 1500,
      easing: 'easeOutCirc',
    })
    .add({
      targets: '.recycling-img--2',
      opacity: [0,1],
      duration: 1500,
      easing: 'easeOutCirc',
    }, '+=800')
    .add({
      targets: '.recycling-img--2',
      opacity: [1,0],
      duration: 1500,
      easing: 'easeOutCirc',
    })
    .add({
      targets: '.recycling-img--3',
      opacity: [0,1],
      duration: 1500,
      easing: 'easeOutCirc',
    }, '+=800')
    .add({
      targets: '.recycling-img--3',
      opacity: [1,0],
      duration: 1500,
      easing: 'easeOutCirc',
    })
    .add({
      targets: '.recycling-img--4',
      opacity: [0,1],
      duration: 1500,
      easing: 'easeOutCirc',
    }, '+=800')
    .add({
      targets: '.recycling-img--4',
      opacity: [1,0],
      duration: 1500,
      easing: 'easeOutCirc',
    })
    .pause()

    if (infoList[3] === true) {
      recyclingAnimation.play()
    }

    else {
      recyclingAnimation.pause()
    }

}, [infoList])
}