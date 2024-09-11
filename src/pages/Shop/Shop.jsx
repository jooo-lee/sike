import useProducts from '../../hooks/useProducts.jsx';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';

const Shop = () => {
  const { products, error, loading } = useProducts();

  if (loading)
    return (
      <div>
        <h2>Shop</h2>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div>
        <h2>Shop</h2>
        <p>A network error was encountered</p>
      </div>
    );

  return (
    <div>
      <h2>Shop</h2>
      {products.map((product) => (
        <ProductCard key={product['node']['id']} product={product} />
      ))}
    </div>
  );
};

export default Shop;
