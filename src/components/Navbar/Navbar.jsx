import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SikeLink = styled(Link)`
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Navbar = () => {
  return (
    <Nav>
      <h1>
        <SikeLink to="/">Sike</SikeLink>
      </h1>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="shop">Shop</Link>
        <Link to="cart">Cart</Link>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
