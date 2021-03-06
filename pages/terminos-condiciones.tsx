import Image from 'next/image'

import type { ReactElement } from "react"
import type { imageType } from 'services/AppProvider'

import Layout from '@components/Layout'

export default function termsPage () {

  return (
    <div className="legalPage">
      <div className="legalPage__banner">
        <h1 className="legalPage__title" >TERMINOS Y CONDICIONES DE USO</h1>
        <div className="img16-9">
          <Image src={"https://rozaviht-media.s3.eu-west-3.amazonaws.com/terms-banner-16-9.webp"} height={853} width={1280} alt={'hola'} layout="responsive"/>
        </div>
        <div className="img3-1">
          <Image src={"https://rozaviht-media.s3.eu-west-3.amazonaws.com/terms-banner-3-1.webp"} height={320} width={960} alt={'hola'} layout="responsive"/>
        </div>
      </div>
      <div className="legalPage__content">
        <h2>NUESTROS TERMINOS Y CONDICIONES DE USO DE LA PÁGINA WEB</h2>
        <p>Última actualización: 23 de Junio de 2022</p>
        <br />
        <p>Las ventas realizadas a través de la página web de www.rozaviht.com son gestionadas únicamente por Rozaviht, los presentes términos y condiciones de compra es el suministro de producto por parte de Rozaviht ofrecidos en la tienda online. Dicha marca, es también, la titular de la presente página web.
        </p>
        <p>
          El presente documento corresponde a los términos y condiciones de uso únicamente de la página web www.rozaviht.com  ,estando sometida a la normativa española. Los términos y condiciones informados por ROZAVIHT, implica una aceptación y compromiso, aplicándose tanto a usuarios como a consumidores. 
        </p>
        <p>
          Disposición general de uso publicitario. En el apartado de suscripción a nuestra plataforma(familia) como le quieras llamar, será únicamente para mantenerte informado de manera web, sobre todas las novedades de nuestra página web, así como de los nuevos productos que saquemos a la venta, siendo esto una ventaja ya que podrás ser de los primeros en conocer el producto o las novedades realizas.
        </p>
        <p>
          Rozaviht, enviará de manera eficaz la copia de su factura y el número de pedido, para una mejor ubicación de este. Si hubiera algún tipo de inconveniente a la hora de envió o realización del pedido, rozaviht se pondrá en contacto con el cliente. Para solventar dicho inconveniente.
          Serán envíos únicamente de manera peninsular en ESPAÑA.
        </p>
        <p>
          Los pedidos podrán ser cancelados únicamente si no se ha recibido ningún correo, con la notificación de su envío, escribiendo al correo electrónico. También se podrá realizar una devolución por cualquier motivo, contando con 14 días para informar de la incidencia y la devolución del producto, una vez este haya sido entregado. De lo contrato tendrá que pagar una penalización de devolución. Te lo detallamos todo en nuestro apartado de DEVOLUCIÓN, de Preguntas Frecuentes.
        </p>
        <p>
          Este comerciante se compromete a no permitir ninguna transacción que sea ilegal, o se considere por las marcas de tarjetas de crédito o el banco adquiriente, que pueda o tenga el potencial de dañar la buena voluntad de los mismos o influir de manera negativa en ellos. Las siguientes actividades están prohibidas en virtud de los programas de las marcas de tarjetas: la venta u oferta de un producto o servicio que no sea de plena conformidad con todas las leyes aplicables al Comprador, Banco Emisor, Comerciante, Titular de la tarjeta, o tarjetas. Además, las siguientes actividades también están prohibidas explícitamente:
        </p>
        <p>-Vender medicamentos.</p>
      </div>
    </div>
  )
}

termsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}