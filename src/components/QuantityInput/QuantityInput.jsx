import { useState } from 'react';
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

  &:hover {
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

  @media (min-width: 768px) {
    width: 4rem;
  }
`;

const QuantityInput = ({ productId, initialQuantity, updateCart }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleBlur = (e) => {
    if (e.target.value === '') {
      setQuantity(1);
      if (updateCart) updateCart(productId, 1);
      return;
    }

    const parsedQuantity = parseInt(e.target.value);
    if (parsedQuantity < 1) {
      setQuantity(1);
      if (updateCart) updateCart(productId, 1);
    } else if (parsedQuantity > 5) {
      setQuantity(5);
      if (updateCart) updateCart(productId, 5);
    } else if (parsedQuantity >= 1 && parsedQuantity <= 5) {
      setQuantity(parsedQuantity);
      if (updateCart) updateCart(productId, parsedQuantity);
    }
  };

  const handleIncrement = () => {
    if (updateCart) updateCart(productId, quantity + 1);
    setQuantity((prevQuantity) => {
      if (prevQuantity < 5) {
        return prevQuantity + 1;
      } else {
        return 5;
      }
    });
  };

  const handleDecrement = () => {
    if (updateCart) updateCart(productId, quantity - 1);
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
      <label htmlFor={`quantityInput${productId}`}>Quantity:</label>
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
          id={`quantityInput${productId}`}
          name={`quantityInput${productId}`}
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
          disabled={quantity >= 5}>
          +
        </IncrementButton>
      </Div>
    </Wrapper>
  );
};

QuantityInput.propTypes = {
  productId: PropTypes.string.isRequired,
  initialQuantity: PropTypes.number.isRequired,
  updateCart: PropTypes.func,
};

export default QuantityInput;
