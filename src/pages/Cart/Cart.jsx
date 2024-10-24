import { useOutletContext } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';

import CartItem from '../../components/CartItem/CartItem.jsx';
import useProducts from '../../hooks/useProducts.jsx';
import MainButton from '../../components/MainButton/MainButton.jsx';

const CartItems = styled.div`
  width: min(500px, 100%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 400px) {
    gap: 2rem;
  }
`;

const Cart = () => {
  const { cart, removeFromCart, resetCart } = useOutletContext();
  const { products, error, loading } = useProducts();

  if (loading)
    return (
      <>
        <h1>Cart</h1>
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </>
    );

  if (error)
    return (
      <>
        <h1>Cart</h1>
        <p>A network error was encountered</p>
      </>
    );

  const productsInCart = [];
  cart.forEach((cartItem) => {
    const product = products.find(
      (product) => product['node']['id'].slice(22) === cartItem.id
    );
    productsInCart.push(product);
  });

  if (cart.length === 0) {
    return (
      <>
        <h1>Cart</h1>
        <p>Your cart is currently empty.</p>
      </>
    );
  }

  return (
    <>
      <h1>Cart</h1>
      <CartItems>
        {productsInCart.map((product) => (
          <CartItem
            key={product['node']['id']}
            product={product}
            removeFromCart={removeFromCart}
          />
        ))}
      </CartItems>
      <MainButton
        text="Checkout"
        type="button"
        onClick={() => {
          alert('You have checked out! Thank you for shopping with us.');
          resetCart();
        }}
      />
    </>
  );
};

export default Cart;
