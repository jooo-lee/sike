import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  width: fit-content;
  text-decoration: none;
`;

const Img = styled.img`
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin-bottom: 0.25rem;
`;

const ProductCard = ({ product, imgSize = 200 }) => {
  return (
    <Card
      to={`/product/${product['node']['title'].toLowerCase()}`}
      state={{ product: product }}>
      {/* Product images have empty alt attributes since they are presented 
      alongside the product names. */}
      <Img
        src={`${product['node']['featuredImage']['url']}&width=${imgSize}&height=${imgSize}`}
        alt=""
        width={`${imgSize}px`}
        height={`${imgSize}px`}
        draggable="false"
        data-testid={`${product['node']['featuredImage']['id']}`}
      />
      <Title>{product['node']['title']}</Title>
      <p>
        CAD $
        {Number.parseFloat(
          product['node']['variants']['edges'][0]['node']['price']['amount']
        ).toFixed(2)}
      </p>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  imgSize: PropTypes.number,
};

export default ProductCard;
