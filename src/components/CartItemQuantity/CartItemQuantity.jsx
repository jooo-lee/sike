import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Div = styled.div`
  display: flex;
  height: 2.5rem;
  border-radius: 5px;
`;

const quantityButtonStyle = css`
  font-size: 1.25rem;
  width: 2.5rem;
  background-color: white;
  border: 1px solid rgb(224, 224, 224);

  &:disabled {
    color: rgb(224, 224, 224);
  }

  &:hover:not(:disabled) {
    cursor: pointer;
  }
`;

const IncrementButton = styled.button`
  ${quantityButtonStyle}
  border-radius: 0px 5px 5px 0px;
`;

const DecrementButton = styled.button`
  ${quantityButtonStyle}
  border-radius: 5px 0px 0px 5px;
`;

const Input = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
  text-align: center;
  font-size: 1rem;
  height: 100%;
  width: 3rem;
  border: 1px rgb(224, 224, 224);
  border-style: solid none;
  border-radius: 0;

  @media (min-width: 768px) {
    width: 4rem;
  }
`;

const CartItemQuantity = ({ productId, maxQuantity = 5 }) => {
  const { cart, updateCart } = useOutletContext();
  const [quantity, setQuantity] = useState(
    () => cart.find((cartItem) => cartItem.id === productId).quantity
  );

  const handleBlur = (e) => {
    if (e.target.value === '') {
      setQuantity(1);
      updateCart(productId, 1);
      return;
    }

    const parsedQuantity = parseInt(e.target.value);
    if (parsedQuantity < 1) {
      setQuantity(1);
      updateCart(productId, 1);
    } else if (parsedQuantity > maxQuantity) {
      setQuantity(maxQuantity);
      updateCart(productId, maxQuantity);
    } else if (parsedQuantity >= 1 && parsedQuantity <= maxQuantity) {
      setQuantity(parsedQuantity);
      updateCart(productId, parsedQuantity);
    }
  };

  const handleIncrement = () => {
    updateCart(productId, quantity + 1);
    setQuantity((prevQuantity) => {
      if (prevQuantity < maxQuantity) {
        return prevQuantity + 1;
      } else {
        return maxQuantity;
      }
    });
  };

  const handleDecrement = () => {
    updateCart(productId, quantity - 1);
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      } else {
        return 1;
      }
    });
  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <Wrapper>
      <label htmlFor={`cartItemQuantity${productId}`}>Quantity:</label>
      <Div>
        <DecrementButton
          type="button"
          aria-label="Decrease quantity"
          onClick={handleDecrement}
          disabled={quantity <= 1}>
          &minus;
        </DecrementButton>
        <Input
          pattern="[0-9]*"
          id={`cartItemQuantity${productId}`}
          name={`cartItemQuantity${productId}`}
          type="number"
          value={quantity}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <IncrementButton
          type="button"
          aria-label="Increase quantity"
          onClick={handleIncrement}
          disabled={quantity >= maxQuantity}>
          +
        </IncrementButton>
      </Div>
    </Wrapper>
  );
};

CartItemQuantity.propTypes = {
  productId: PropTypes.string.isRequired,
  maxQuantity: PropTypes.number,
};

export default CartItemQuantity;
