import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';

import CartItemQuantity from '../CartItemQuantity/CartItemQuantity.jsx';

const Card = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
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

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgb(224, 224, 224);
  padding: 4px;

  &:hover {
    cursor: pointer;
  }
`;

const CartItem = ({ product, imgSize = 100, removeFromCart }) => {
  return (
    <Card>
      <Image to={`/product/${product['node']['id'].slice(22)}`}>
        {/* Product images have empty alt attributes since they are presented
        alongside the product names. */}
        <picture>
          <source
            media="(max-width: 400px)"
            srcSet={`${product['node']['featuredImage']['url']}&width=${
              imgSize + 100
            }&height=${imgSize + 100}`}
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
        <CartItemQuantity productId={product['node']['id'].slice(22)} />
      </Info>
      <DeleteButton
        type="button"
        onClick={() => removeFromCart(product['node']['id'].slice(22))}>
        <Icon
          path={mdiTrashCanOutline}
          title="Remove from cart"
          size={1}
          color="black"
        />
      </DeleteButton>
    </Card>
  );
};

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
  imgSize: PropTypes.number,
  removeFromCart: PropTypes.func.isRequired,
};

export default CartItem;
