import { useLocation } from 'react-router-dom';

const Product = () => {
  const location = useLocation();
  const { product } = location.state;
  return (
    <>
      <h1>{product['node']['title']}</h1>
    </>
  );
};

export default Product;
