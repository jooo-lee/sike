import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import GlobalStyle from './globalStyles.js';
import Navbar from './components/Navbar/Navbar.jsx';

const App = () => {
  const [cart, setCart] = useState(() => {
    // Retrieve and use stored cart if applicable
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    return storedCart ? storedCart : [];
  });

  // Keep localStorage cart in sync
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId, quantity) => {
    // If product is already in the cart, add new quantity to previous quantity
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

  // Update quantity of product already in cart
  const updateCart = (productId, quantity) => {
    setCart(
      cart.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: quantity };
        } else {
          return product;
        }
      })
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id != productId));
  };

  const resetCart = () => {
    setCart([]);
  };

  return (
    <>
      <GlobalStyle />
      <Navbar
        cartQuantity={cart.reduce((acc, product) => acc + product.quantity, 0)}
      />
      <Outlet
        context={{ cart, addToCart, updateCart, removeFromCart, resetCart }}
      />
    </>
  );
};

export default App;
