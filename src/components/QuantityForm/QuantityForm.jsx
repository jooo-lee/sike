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
  const { cart, addToCart } = useOutletContext();
  const [submitted, setSubmitted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const productInCart = cart.find((cartItem) => cartItem.id === productId);
  const quantityInCart = productInCart ? productInCart.quantity : 0;
  const limitReached = 5 - quantityInCart <= 0;
  const maxQuantity = 5 - quantityInCart;

  const handleSubmit = (e) => {
    e.preventDefault();
    addToCart(
      productId,
      parseInt(
        e['currentTarget']['elements'][`quantityInput${productId}`]['value']
      )
    );
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setQuantity(1);
    }, 2500);
  };

  if (submitted) {
    return (
      <Form
        onSubmit={handleSubmit}
        name="quantityForm"
        aria-label="quantityForm">
        <QuantityInput
          quantity={quantity}
          setQuantity={setQuantity}
          productId={productId}
          maxQuantity={maxQuantity}
        />
        <AddedNotification>Added to cart!</AddedNotification>
      </Form>
    );
  }

  if (limitReached) {
    return (
      <Form
        onSubmit={handleSubmit}
        name="quantityForm"
        aria-label="quantityForm">
        <MainButton text={'Limit reached'} disabled={true} />
      </Form>
    );
  }

  return (
    <Form onSubmit={handleSubmit} name="quantityForm" aria-label="quantityForm">
      <QuantityInput
        quantity={quantity}
        setQuantity={setQuantity}
        productId={productId}
        maxQuantity={maxQuantity}
      />
      <MainButton text={'Add to cart'} />
    </Form>
  );
};

QuantityForm.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default QuantityForm;
