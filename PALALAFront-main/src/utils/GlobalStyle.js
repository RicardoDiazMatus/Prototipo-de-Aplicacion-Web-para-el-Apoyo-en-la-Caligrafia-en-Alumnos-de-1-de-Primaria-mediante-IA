import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* Application Styiles */
  /* apply a natural box layout model to all elements, but allowing components to change */
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  h1{
    font-size: 4.8rem;
    margin: 0;
  }

  h2{
    font-size: 2.4rem;
    margin: 0;
  }

  h3{
    font-size: 1.8rem;
    margin: 0;
  }

  h4{
    font-size: 1.2rem;
  }

  p, a{
    font-size: 1.6rem;
    margin: 0;
  }

  .lightbulb-icon{
    color: #FFBE0A;
    cursor: pointer;
    
  }
  
  .desktop-768{
    display: none !important;
    @media (min-width: 768px) {
      display: flex !important;
    }
  }

  .desktop-1024{
    display: none !important;
    @media (min-width: 1024px) {
      display: flex !important;
    }
  }

.no-desktop-768{
  display: flex;
    @media (min-width: 768px) {
      display: none !important;
    }
}

  .no-desktop-1024{
    display: flex;
    @media (min-width: 1024px) {
      display: none !important;
    }
  }

`;
