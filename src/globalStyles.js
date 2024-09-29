import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Helvetica, Arial, Roboto, sans-serif;;
  }

  html {
    height: 100%;
  }

  body {
    min-height: 100%;
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
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1rem;
  }

  a {
    color: black;
  }

  img {
    border-radius: 8px;
  }

  button {
    font-size: 1rem;
    padding: 0.75rem 1rem;
    background-color: #0071e3;
    color: white;
    border: none;
    border-radius: 980px;
  }
`;

export default GlobalStyle;
