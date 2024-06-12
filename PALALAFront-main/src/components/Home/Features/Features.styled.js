import { styled } from "styled-components";

export const StyledFeatures = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #ffbe0a;
  h2 {
    margin: 4rem 0;
    color: #ffffff;
    text-align: center;
  }

  .features-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    margin: 0 auto;
    height: 100%;
  }

  .features-inner-circle {
    display: none;
  }

  @media (min-width: 768px) {
    background-color: #fe5d41;
    .features-container {
      color: #ffffff;
      width: 80%;
      align-items: center;
      height: 40%;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 10rem;
      row-gap: 20rem;
    }

    .features-inner-circle {
      display: flex;
      width: 90%;
      justify-content: space-between;
      > div {
        &:first-child {
          height: 25rem;
          width: 30rem;
          border: #ffffff dashed 0.5rem;
          border-radius: 100%;
        }
      }
    }
  }
  @media (min-width: 768px){
    height: auto;
  }
`;
