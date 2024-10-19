import PropTypes from 'prop-types';
import { Link, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import QuantityInput from '../QuantityInput/QuantityInput.jsx';

const Card = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled(Link)`
  height: fit-content;
`;

const Info = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Title = styled(Link)`
  text-decoration: none;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

const CartItem = ({ product, imgSize = 100 }) => {
  const { cart, updateCart } = useOutletContext();

  return (
    <Card>
      <Image to={`/product/${product['node']['id'].slice(22)}`}>
        {/* Product images have empty alt attributes since they are presented
        alongside the product names. */}
        <picture>
          <source
            media="(max-width: 400px)"
            srcSet={`${product['node']['featuredImage']['url']}&width=${imgSize}&height=${imgSize}`}
            width={imgSize}
            height={imgSize}
          />
          <img
            src={`${product['node']['featuredImage']['url']}&width=${
              imgSize + 250
            }&height=${imgSize + 250}`}
            alt=""
            data-testid={`${product['node']['featuredImage']['id']}`}
            width={imgSize + 50}
            height={imgSize + 50}
          />
        </picture>
      </Image>
      <Info>
        <div>
          <Title to={`/product/${product['node']['id'].slice(22)}`}>
            <h2>{product['node']['title']}</h2>
          </Title>
          <p>
            CAD $
            {Number.parseFloat(
              product['node']['variants']['edges'][0]['node']['price']['amount']
            ).toFixed(2)}
          </p>
        </div>
        <QuantityInput
          productId={product['node']['id'].slice(22)}
          initialQuantity={
            cart.find(
              (cartItem) => cartItem.id === product['node']['id'].slice(22)
            ).quantity
          }
          updateCart={updateCart}
        />
      </Info>
    </Card>
  );
};

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
  imgSize: PropTypes.number,
};

export default CartItem;
