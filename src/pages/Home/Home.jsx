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
        <picture>
          <source
            media="(max-width: 350px)"
            srcSet="/sweatpants.webp"
            width="200"
            height="200"
          />
          <source
            media="(max-width: 450px)"
            srcSet="/sweatpants.webp"
            width="250"
            height="250"
          />
          <img
            src="/sweatpants.webp"
            alt=""
            width="300"
            height="300"
            data-testid="home-image"
          />
        </picture>
        <p>Welcome to Sike! Like Nike but worse quality.</p>
        <MainButton text="Start shopping" onClick={() => navigate('/shop')} />
      </Content>
    </>
  );
};

export default Home;
