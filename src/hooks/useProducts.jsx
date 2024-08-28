import { useState, useEffect } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('products')) {
      // For user's first visit, fetch data from API and cache it locally
      fetch(
        `https://mock.shop/api?query={products(first:%2020){edges%20{node%20
        {id%20title%20description%20featuredImage%20{id%20url}%20
        variants(first:%201){edges%20{node%20{price%20{amount%20currencyCode
        }}}}}}}}`
      )
        .then((response) => {
          if (!response.ok) throw new Error('server error');
          return response.json();
        })
        .then((response) => {
          const newProducts = response['data']['products']['edges'];
          setProducts(newProducts);
          localStorage.setItem('products', JSON.stringify(newProducts));
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    } else {
      // For user's non-first visits, retrieve data from local storage
      setProducts(JSON.parse(localStorage.getItem('products')));
      setLoading(false);
    }
  }, []);

  return { products, error, loading };
};

export default useProducts;
