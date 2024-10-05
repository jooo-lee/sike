import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import GlobalStyle from './globalStyles.js';
import Navbar from './components/Navbar/Navbar.jsx';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (productId, quantity) => {
    // If product is already in the cart, just update its quantity
    if (cart.some((product) => product.id === productId)) {
      setCart(
        cart.map((product) => {
          if (product.id === productId) {
            return { ...product, quantity: product.quantity + quantity };
          } else {
            return product;
          }
        })
      );
    } else {
      setCart([...cart, { id: productId, quantity: quantity }]);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Navbar
        cartQuantity={cart.reduce((acc, product) => acc + product.quantity, 0)}
      />
      <Outlet context={{ cart, addToCart }} />
    </>
  );
};

export default App;
