
export type SliderDotsProps = {
  arrayParent: any[]
  activeIndex: number
}

const SliderDots = ({ arrayParent, activeIndex }:SliderDotsProps) => {
  
  return (
    <div className="dots-container">
      {arrayParent.map((element, index) => (
        <span key={`${element}+${index}`} className={activeIndex === index ? "dot active" : "dot"}/>
      ))}
    </div>
  )
}

export default SliderDots