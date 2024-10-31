import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import MainButton from '../../components/MainButton/MainButton.jsx';

const Content = styled.div`
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Home</h1>
      <Content>
        <p>Welcome to Sike! Like Nike but worse quality.</p>
        <MainButton text="Start shopping" onClick={() => navigate('/shop')} />
      </Content>
    </>
  );
};

export default Home;
