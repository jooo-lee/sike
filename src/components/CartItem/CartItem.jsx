import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
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

  &:hover {
    text-decoration: underline;
  }
`;

const CartItem = ({ product, imgSize = 150 }) => {
  return (
    <Card>
      <Link to={`/product/${product['node']['id'].slice(22)}`}>
        {/* Product images have empty alt attributes since they are presented
        alongside the product names. */}
        <picture>
          <source
            media="(max-width: 450px)"
            srcSet={`${product['node']['featuredImage']['url']}&width=${
              imgSize + 100
            }&height=${imgSize + 100}`}
            width={imgSize}
            height={imgSize}
          />
          <img
            src={`${product['node']['featuredImage']['url']}&width=${
              imgSize + 200
            }&height=${imgSize + 200}`}
            alt=""
            data-testid={`${product['node']['featuredImage']['id']}`}
            width={imgSize}
            height={imgSize}
          />
        </picture>
      </Link>
      <Info>
        <Title to={`/product/${product['node']['id'].slice(22)}`}>
          <h2>{product['node']['title']}</h2>
        </Title>
        <p>
          CAD $
          {Number.parseFloat(
            product['node']['variants']['edges'][0]['node']['price']['amount']
          ).toFixed(2)}
        </p>
      </Info>
    </Card>
  );
};

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
  imgSize: PropTypes.number,
};

export default CartItem;
