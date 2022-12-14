import { createPortal } from "react-dom"

import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { AppContext } from "services/AppContext"


const createWrapperAndAppendToBoddy = (wrapperId: string) => {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute("id", wrapperId)
  document.body.appendChild(wrapperElement)
  return wrapperElement
}


export default function ReactPortal({ children, wrapperId = "pop-up-container" }: {children: any, wrapperId: string}) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false
    //if element is not found with wrapperId
    //create and append to body
    
    if (!element) {
      systemCreated = true
      element = createWrapperAndAppendToBoddy(wrapperId)
    }
  
    setWrapperElement(element)

    return () => {
      //delete the programatically created element
      if (systemCreated && element!.parentNode) {
        element?.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  //wrapperElement state will be null on the very first render
  if (wrapperElement === null) return null

  return createPortal(children, wrapperElement)
}