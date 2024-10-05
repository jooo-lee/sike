import { useOutletContext } from 'react-router-dom';

const Cart = () => {
  const { cart } = useOutletContext();

  console.log(cart);

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
};

export default Cart;
