import { TailSpin } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useProducts from '../../hooks/useProducts.jsx';
import QuantityForm from '../../components/QuantityForm/QuantityForm.jsx';

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    'title'
    'image'
    'sidebar';
  justify-items: center;
  gap: 2rem;

  @media (min-width: 950px) {
    height: 100%;
    grid-template-areas:
      'image sidebar'
      'image sidebar';
  }
`;

const Picture = styled.picture`
  grid-area: image;

  @media (min-width: 950px) {
    align-self: center;
  }
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const H1 = styled.h1`
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  text-align: center;
`;

const Description = styled.p`
  max-width: 400px;
  margin: 1rem 1rem 0 1rem;
`;

const Product = () => {
  const { productId } = useParams();
  const { products, error, loading } = useProducts();

  if (loading) {
    return (
      <>
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
  }

  if (error) {
    return (
      <>
        <p>A network error was encountered</p>
      </>
    );
  }

  const product = products.find(
    (product) => product['node']['id'].slice(22) === productId
  );

  return (
    <>
      <Wrapper>
        <Picture>
          <source
            media="(max-width: 350px)"
            srcSet={`${product['node']['featuredImage']['url']}&width=250&height=250`}
            width="250"
            height="250"
          />
          <source
            media="(max-width: 450px)"
            srcSet={`${product['node']['featuredImage']['url']}&width=450&height=450`}
            width="300"
            height="300"
          />
          <img
            src={`${product['node']['featuredImage']['url']}&width=600&height=600`}
            alt=""
            data-testid={`${product['node']['featuredImage']['id']}`}
            width="400"
            height="400"
          />
        </Picture>
        <Sidebar>
          <div>
            <H1>{product['node']['title']}</H1>
            <Price>
              CAD $
              {Number.parseFloat(
                product['node']['variants']['edges'][0]['node']['price'][
                  'amount'
                ]
              ).toFixed(2)}
            </Price>
          </div>
          <QuantityForm productId={productId} />
          <Description>{product['node']['description']}</Description>
        </Sidebar>
      </Wrapper>
    </>
  );
};

export default Product;
