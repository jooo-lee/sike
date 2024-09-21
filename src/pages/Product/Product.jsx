import { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';

const Product = () => {
  const [loading, setLoading] = useState(true);

  // Get state value from ProductCard
  const location = useLocation();
  const { product } = location.state;

  return (
    <>
      <h1>{product['node']['title']}</h1>
      {loading ? (
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        ''
      )}
      <img
        srcSet={`${product['node']['featuredImage']['url']}&width=200&height=200 200w, ${product['node']['featuredImage']['url']}&width=400&height=400 400w`}
        sizes="(max-width: 450px) 200px, 400px"
        src={`${product['node']['featuredImage']['url']}&width=400&height=400`}
        alt=""
        data-testid={`${product['node']['featuredImage']['id']}`}
        onLoad={() => setLoading(false)}
      />
    </>
  );
};

export default Product;
