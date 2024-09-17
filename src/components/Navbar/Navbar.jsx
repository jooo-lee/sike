import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SiteTitle = styled(Link)`
  text-decoration: none;
  margin-right: auto;
  font-size: 1.25rem;
  font-weight: normal;
`;

const Navbar = () => {
  return (
    <Nav>
      <SiteTitle to="/">Sike</SiteTitle>
      <Link to="/">Home</Link>
      <Link to="shop">Shop</Link>
      <Link to="cart">Cart</Link>
    </Nav>
  );
};

export default Navbar;
