import styled from 'styled-components';

import useProducts from '../../hooks/useProducts.jsx';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';

const PageTitle = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

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
        <PageTitle>Shop</PageTitle>
        <p>Loading...</p>
      </>
    );
  if (error)
    return (
      <>
        <PageTitle>Shop</PageTitle>
        <p>A network error was encountered</p>
      </>
    );

  return (
    <>
      <PageTitle>Shop</PageTitle>
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
