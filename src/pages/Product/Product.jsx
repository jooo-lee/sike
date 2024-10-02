import { TailSpin } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useProducts from '../../hooks/useProducts.jsx';
import QuantityInput from '../../components/QuantityInput/QuantityInput.jsx';
import MainButton from '../../components/MainButton/MainButton.jsx';

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
      'image title'
      'image sidebar';
  }
`;

const Picture = styled.picture`
  grid-area: image;

  @media (min-width: 950px) {
    align-self: center;
  }
`;

const H1 = styled.h1`
  grid-area: title;
  margin-bottom: 0;
  @media (min-width: 950px) {
    align-self: end;
  }
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Description = styled.p`
  max-width: 400px;
  margin-left: 1rem;
  margin-right: 1rem;
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
        <H1>{product['node']['title']}</H1>
        <Sidebar>
          <Form action="">
            <QuantityInput />
            <MainButton text={'Add to cart'} />
          </Form>
          <Description>{product['node']['description']}</Description>
        </Sidebar>
      </Wrapper>
    </>
  );
};

export default Product;
