import Image from 'next/image'
import { CartItemType } from '../services/AppProvider'
import useCartActions from '@hooks/useCartActions'

export type CartItemProps = {
  cartProduct: CartItemType
}

export default function CartItem ({cartProduct}: CartItemProps) {

  const { incrementAmount, decrementAmount, handleRemoveFromCart } = useCartActions()

  var totalItemPrice = cartProduct.amount * cartProduct.price




  return (
    <div className="flexcolum cartItem">
      <button className="closeBt closeBt--topRight" onClick={() => handleRemoveFromCart(cartProduct.id)}>
        <div className="closeBt__lineL"></div>
        <div className="closeBt__lineR"></div>
      </button>
      <div className="cartItem__img">
        <Image src={cartProduct.image.url} width={cartProduct.image.width!} height={cartProduct.image.height!} layout='responsive' objectFit='contain' ></Image>
      </div>
      <div className="flexrow-between">
        <p>Producto:</p>
        <h3>{cartProduct.name}</h3>
      </div>
      <div className="flexrow-between">
        <p>Precio:</p>
        <h3>{`${totalItemPrice},00€`}</h3>
      </div>
      <div className="flexrow-between">
        <p>Cantidad:</p>
        <div className="amount--cart" style={{ 'maxHeight': '40px' }}>
          <button className="amount-bt--cart bt--minus" onClick={()=>decrementAmount(cartProduct)}>-</button>
          <input className="amount-input--cart" type="number" value={cartProduct.amount} disabled={true}/>
          <button className="amount-bt--cart bt--plus" onClick={()=>incrementAmount(cartProduct)}>+</button>
        </div>
      </div>
    </div>
  )
}

