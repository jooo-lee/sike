import Navbar from '../components/Navbar/Navbar.jsx';
import GlobalStyle from '../globalStyles.js';

const Error = () => {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <h1>Error!</h1>
      <p>Something must have gone wrong...</p>
    </>
  );
};

export default Error;
