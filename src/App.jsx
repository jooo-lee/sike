import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
