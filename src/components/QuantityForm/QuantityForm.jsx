import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

import QuantityInput from '../QuantityInput/QuantityInput.jsx';
import MainButton from '../MainButton/MainButton.jsx';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const AddedNotification = styled.p`
  color: #0071e3;
  display: flex;
  align-items: center;

  // Match height of add to cart button to prevent layout shift
  height: 42px;
`;

// Form to add product to cart from product page
const QuantityForm = ({ productId }) => {
  const { addToCart } = useOutletContext();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addToCart(
      productId,
      parseInt(
        e['currentTarget']['elements'][`quantityInput${productId}`]['value']
      )
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <Form onSubmit={handleSubmit} name="quantityForm" aria-label="quantityForm">
      <QuantityInput productId={productId} initialQuantity={1} />
      {submitted ? (
        <AddedNotification>Added to cart!</AddedNotification>
      ) : (
        <MainButton text={'Add to cart'} />
      )}
    </Form>
  );
};

QuantityForm.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default QuantityForm;
