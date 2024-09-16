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
  }

  #root {
    padding: 1rem 1rem 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default GlobalStyle;
