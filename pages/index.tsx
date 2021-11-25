import Link from 'next/link'

const index = () => {
  return (
    <div className="home-wrapper">
      <div className="home-banner"></div>
      <div className="home-info">
        <h2>Siempre a tu disposición</h2>
        <p>Envios solo a Península</p>
      </div>
      <div className="home-products">
        <h1>ACEITE CBD</h1>
        <div className="home-products-container">
          <Link href="aceite-cbd">
            <a className="home-products-container-item">
              <img src={''} alt="" />
              <p>Aceite de CBD 10%</p>
              <p>0% THC | 10ml</p>
              <p>45,00€</p>
            </a>
          </Link>
          <Link href="aceite-cbd">
            <a className="home-products-container-item">
              <img src={''} alt="" />
              <p>Aceite de CBD 20%</p>
              <p>0% THC | 10ml</p>
              <p>60,00€</p>
            </a>
          </Link>
        </div>
      </div>
      <div className="home-presentation"></div>
    </div>
  )
}

export default index;