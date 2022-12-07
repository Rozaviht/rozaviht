import { useState, useContext } from "react"
import { AppContext } from "services/AppContext"
import type { CartItemType } from "services/AppProvider"
import type { CbdPageProps } from "pages/aceite-cbd"

export  default  ({CbdProductsData}:CbdPageProps) => {

  const { setCartProducts } = useContext( AppContext )
  
  var CbdProducts= CbdProductsData.products

  const [infoList, setInfoList] = useState([false, false, false, false])
  const [showAddedPopUp, setShowAddedPopUp] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<CartItemType>({
    ...CbdProducts[0],
    amount: 1
  } as CartItemType )

  var totalAmountPrice: number = currentProduct.amount * currentProduct.price

  
  const decrementAmount = () => {
    if (currentProduct.amount > 1) {
      setCurrentProduct(prev => ({
        ...prev,
        amount: prev.amount - 1
      }))
    }
  }


  const incrementAmount = () => {
    setCurrentProduct(prev => ({
      ...prev,
      amount: prev.amount + 1
    }))
  }

  const changeOil = (oilType: number) => {
    if (oilType === 10) {
      setCurrentProduct({
        ...CbdProducts[0],
        amount: 1
      })
    }
    else {
      setCurrentProduct({
        ...CbdProducts[1],
        amount: 1
      })
    }
  }

const handleAddToCart = (productSelected: CartItemType) => {
  setCartProducts(prev => {
    const isItemInCart = prev.find(item => item.id === productSelected.id);

    if (isItemInCart) {
      return prev.map(item =>
        item.id === productSelected.id
          ? { ...item, amount: item.amount + productSelected.amount }
          : item
      );
    }
    return [...prev, { ...productSelected, amount: productSelected.amount }];
  });
  
  setShowAddedPopUp(true)
};

const handleDropInfo = (index:number) => {
  let infoCopy = [...infoList]
  infoCopy[index] = !infoList[index]
  setInfoList(infoCopy)
}

  return {decrementAmount, incrementAmount, changeOil, handleDropInfo, handleAddToCart, showAddedPopUp, setShowAddedPopUp, infoList, setInfoList, currentProduct, setCurrentProduct, totalAmountPrice}
}