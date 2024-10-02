import { useState } from 'react';
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
  width: 4rem;
  border: 1px rgb(224, 224, 224);
  border-style: solid none;
`;

const QuantityInput = () => {
  const [value, setValue] = useState(1);

  const handleBlur = (e) => {
    if (e.target.value === '') {
      setValue(1);
      return;
    }

    const quantity = parseInt(e.target.value);

    if (quantity < 1) {
      setValue(1);
    } else if (quantity > 5) {
      setValue(5);
    } else if (quantity >= 1 && quantity <= 5) {
      setValue(quantity);
    }
  };

  const handleIncrement = () => {
    setValue((prevValue) => {
      if (prevValue < 5) {
        return prevValue + 1;
      } else {
        return 5;
      }
    });
  };

  const handleDecrement = () => {
    setValue((prevValue) => {
      if (prevValue > 1) {
        return prevValue - 1;
      } else {
        return 1;
      }
    });
  };

  return (
    <Wrapper>
      <label htmlFor="quantity">Quantity:</label>
      <Div>
        <DecrementButton
          type="button"
          aria-label="Decrease quantity"
          onClick={handleDecrement}>
          &minus;
        </DecrementButton>
        <Input
          pattern="[0-9]*"
          id="quantity"
          name="quantity"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          required
        />
        <IncrementButton
          type="button"
          aria-label="Increase quantity"
          onClick={handleIncrement}>
          +
        </IncrementButton>
      </Div>
    </Wrapper>
  );
};

export default QuantityInput;
