import { useContext } from "react";
import { AppContext } from "services/AppContext";
import type { CartItemType } from "services/AppProvider";

export default () => {

  const { setCartProducts, cartProducts } = useContext( AppContext )

  const incrementAmount = (clickedItem: CartItemType) => {
    setCartProducts(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
  
      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const decrementAmount = (clickedItem: CartItemType) => {
    setCartProducts(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id && item.amount > 1
            ? { ...item, amount: item.amount - 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    let elementProduct = cartProducts.find(element => element.id === productId)
    setCartProducts(() =>
      cartProducts.filter(function(element) {
        return element !== elementProduct
      })
    );
  };

  return { incrementAmount, decrementAmount, handleRemoveFromCart }

}

