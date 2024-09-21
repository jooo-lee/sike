import { useLocation } from 'react-router-dom';

const Product = () => {
  // Get state value from ProductCard
  const location = useLocation();
  const { product } = location.state;

  return (
    <>
      <h1>{product['node']['title']}</h1>
      <img
        srcSet={`${product['node']['featuredImage']['url']}&width=200&height=200 200w, ${product['node']['featuredImage']['url']}&width=400&height=400 400w`}
        sizes="(max-width: 450px) 200px, 400px"
        src={`${product['node']['featuredImage']['url']}&width=400&height=400`}
        alt=""
        data-testid={`${product['node']['featuredImage']['id']}`}
      />
    </>
  );
};

export default Product;
