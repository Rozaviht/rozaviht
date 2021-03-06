import useRecyclingAnimation from '@hooks/useRecyclingAnimation'

import Scene1 from 'public/img/recycling-scene-1.svg'
import Scene2 from 'public/img/recycling-scene-2.svg'
import Scene3 from 'public/img/recycling-scene-3.svg'
import Scene4 from 'public/img/recycling-scene-4.svg'
import Scene5 from 'public/img/recycling-scene-5.svg'

type RecyclingAnimatinoProps = {
  infoList: boolean[]
}

export default function RecyclingAnimation ({ infoList}: RecyclingAnimatinoProps) {

  let sceneArray = [
    <Scene1 key={1}/>,
    <Scene2 key={2}/>,
    <Scene3 key={3}/>,
    <Scene4 key={4}/>,
    <Scene5 key={5}/>,
  ]

  useRecyclingAnimation({infoList})

  return (
    <div className="recycling-animation-container">
      {sceneArray.map((scene, index) => 
        <div key={index}  className={`recycling-img recycling-img--${index}`}>
          {scene}
        </div>
      )}
    </div>
  )
}