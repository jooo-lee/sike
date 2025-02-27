import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';

import useProducts from '../../hooks/useProducts.jsx';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';

const productImageSize = 200;

const CardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${productImageSize}px, 1fr));
  justify-items: center;
  gap: 1.5rem 0.5rem;
`;

const Shop = () => {
  const { products, error, loading } = useProducts();

  if (loading)
    return (
      <>
        <h1>Shop</h1>
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
      </>
    );

  if (error)
    return (
      <>
        <h1>Shop</h1>
        <p>A network error was encountered</p>
      </>
    );

  return (
    <>
      <h1>Shop</h1>
      <CardContainer>
        {products.map((product) => (
          <ProductCard
            key={product['node']['id']}
            product={product}
            imgSize={productImageSize}
          />
        ))}
      </CardContainer>
    </>
  );
};

export default Shop;
