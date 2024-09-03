import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const Img = styled.img`
  width: 200px;
`;

const ProductCard = ({ product }) => {
  return (
    <Card>
      <Img
        src={product['node']['featuredImage']['url']}
        alt={product['node']['title']}
      />
      <p>{product['node']['title']}</p>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
