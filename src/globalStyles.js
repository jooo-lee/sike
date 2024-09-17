import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Helvetica, Arial, Roboto, sans-serif;;
  }

  body {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  #root {
    padding: 1rem 1rem 3rem;
    width: min(100%, 1200px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  h1 {
    font-size: 1.75rem;
    font-weight: normal;
  }

  a {
    color: black;
  }
`;

export default GlobalStyle;
