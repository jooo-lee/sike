import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h1>
        <Link to="/">Sike</Link>
      </h1>
      <Link to="/">Home</Link>
      <Link to="shop">Shop</Link>
      <Link to="cart">Cart</Link>
    </nav>
  );
};

export default Navbar;
