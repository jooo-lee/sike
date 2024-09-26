import { TailSpin } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

import useProducts from '../../hooks/useProducts.jsx';
import QuantityInput from '../../components/QuantityInput/QuantityInput.jsx';

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
      <h1>{product['node']['title']}</h1>
      <picture>
        <source
          media="(max-width: 350px)"
          srcSet={`${product['node']['featuredImage']['url']}&width=200&height=200`}
          width="200"
          height="200"
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
      </picture>
      <form action="">
        <QuantityInput />
      </form>
    </>
  );
};

export default Product;
