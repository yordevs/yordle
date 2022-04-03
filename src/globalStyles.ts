import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    font-family: "Roboto";
  } 

  body {
    margin: 0;
  }

  #root {
    height: 100%;
  }

  .App {
    height: 100%;
  }
`;
