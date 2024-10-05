import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import QuantityInput from '../QuantityInput/QuantityInput.jsx';
import MainButton from '../MainButton/MainButton.jsx';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const QuantityForm = ({ productId }) => {
  const { addToCart } = useOutletContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    addToCart(
      productId,
      parseInt(e.currentTarget.elements.quantityInput.value)
    );
  };

  return (
    <Form onSubmit={handleSubmit} name="quantityForm" aria-label="quantityForm">
      <QuantityInput />
      <MainButton text={'Add to cart'} />
    </Form>
  );
};

QuantityForm.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default QuantityForm;
