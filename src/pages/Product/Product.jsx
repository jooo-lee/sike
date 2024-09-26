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
      <img
        srcSet={`${product['node']['featuredImage']['url']}&width=200&height=200 200w, ${product['node']['featuredImage']['url']}&width=400&height=400 400w`}
        sizes="(max-width: 450px) 200px, 400px"
        src={`${product['node']['featuredImage']['url']}&width=400&height=400`}
        alt=""
        data-testid={`${product['node']['featuredImage']['id']}`}
      />
      <form action="">
        <QuantityInput />
      </form>
    </>
  );
};

export default Product;
