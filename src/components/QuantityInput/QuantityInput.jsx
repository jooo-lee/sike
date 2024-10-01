import { useState } from 'react';

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
    <>
      <label htmlFor="quantity">Quantity:</label>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={handleDecrement}>
        -
      </button>
      <input
        pattern="[0-9]*"
        id="quantity"
        name="quantity"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        required
      />
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={handleIncrement}>
        +
      </button>
    </>
  );
};

export default QuantityInput;
