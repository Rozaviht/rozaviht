import { useContext } from "react"
import Image from "next/image"
import Link from "next/link"

import { AppContext } from 'services/AppContext'

import GuyMobile from "@img/rozaday-banner.jpeg"

const ArticleThumbnail = () => {
  const { ProductDetails } = useContext( AppContext )
  return (
    <div className="article-thumbnail">
      <div>
        <Image src={GuyMobile} height={100} width={150} layout="responsive" />
      </div>
      <p>Categoria</p>
      <h3>Titulo</h3>
      <p>fecha</p>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
      <Link href="">
        <a className="">LEER MÁS</a>
      </Link>
    </div>
  )
}

export default ArticleThumbnail