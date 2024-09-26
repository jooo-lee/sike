import { useState } from 'react';

const QuantityInput = () => {
  const [value, setValue] = useState('1');

  return (
    <label htmlFor="quantity">
      {`Quantity: `}
      <select
        id="quantity"
        value={value}
        onChange={(e) => setValue(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </label>
  );
};

export default QuantityInput;
