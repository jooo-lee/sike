import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

const Img = styled.img`
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin-bottom: 0.25rem;
`;

const ProductCard = ({ product, imgSize }) => {
  return (
    <Card>
      <Img
        src={`${product['node']['featuredImage']['url']}&width=${imgSize}&height=${imgSize}`}
        alt={product['node']['title']}
        width={`${imgSize}px`}
        height={`${imgSize}px`}
        draggable="false"
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
  imgSize: PropTypes.number.isRequired,
};

export default ProductCard;
