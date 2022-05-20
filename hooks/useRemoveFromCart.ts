
export default handleRemoveFromCart (productId: number) {
    let elementProduct = cartProducts.find(element => element.id === productId)
    setCartProducts(() =>
      cartProducts.filter(function(element) {
        return element !== elementProduct
      })
    );
  };