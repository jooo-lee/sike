import { Outlet } from 'react-router-dom';

import GlobalStyle from './globalStyles.js';
import Navbar from './components/Navbar/Navbar.jsx';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
