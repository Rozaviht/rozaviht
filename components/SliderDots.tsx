
export type SliderDotsProps = {
  arrayParent: any[]
  activeIndex: number
}

const SliderDots = ({ arrayParent, activeIndex }:SliderDotsProps) => {
  
  return (
    <div className="containerflex--row">
      {arrayParent.map((element, index) => (
        <span key={element} className={activeIndex === index ? "dot active" : "dot"}/>
      ))}
    </div>
  )
}

export default SliderDots